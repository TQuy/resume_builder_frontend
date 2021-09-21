import json
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.db import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from job_finder.models import Resume, User


# Create your views here.
def index(request):
    return render(request, 'job_finder/index.html')


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("job_finder:index"))
        else:
            return render(request, "job_finder/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "job_finder/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("job_finder:index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "job_finder/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
        except IntegrityError:
            return render(request, "job_finder/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("job_finder:index"))
    else:
        return render(request, "job_finder/register.html")

# -----------for api--------------

@login_required
@api_view(['GET'])
def list_resume(request):
    if request.method == 'GET':
        resume_list = request.user.resume_set.values('id', 'name')
        return Response({
            'content': resume_list,
            'message': 'OK'
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'message': 'GET request required',
        }, status=status.HTTP_400_BAD_REQUEST)

@login_required
@api_view(['POST'])
def save_resume(request):
    if request.method == 'POST':
        name = request.data['name']
        content = request.data['content']
        resume, _ = Resume.objects.get_or_create(user=request.user, name=name)
        resume.content = json.dumps(content)
        resume.save()
        return Response({
            'id': resume.id,
            'name': resume.name,
            'message': 'Saved successfully',
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'message': 'POST request required',
        }, status=status.HTTP_400_BAD_REQUEST)


@login_required
@api_view(['GET'])
def load_resume(request, resume_id):
    if request.method == 'GET':
        resume = get_object_or_404(Resume, pk=resume_id, user=request.user)
        return Response({
            'id': resume.id,
            'name': resume.name,
            'content': json.loads(resume.content),
            'message': 'Loaded successfully.'
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'message': 'GET request required'
        }, status=status.HTTP_400_BAD_REQUEST)

@login_required
@api_view(['DELETE'])
def delete_resume(request, resume_id):
    if request.method == 'DELETE':
        resume = get_object_or_404(Resume, pk=resume_id, user=request.user)
        resume.delete()
        return Response({
            'message': 'Deleted successfully.'
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'message': 'DELETE request required.'
        }, status=status.HTTP_400_BAD_REQUEST)
