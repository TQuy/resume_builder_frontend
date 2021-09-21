from django.urls import path
from resume_responsive import views

app_name = "resume_responsive"
urlpatterns = [
    path('', views.index, name='index'),
]