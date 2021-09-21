from django.urls import path
from resume import views

app_name = "resume"
urlpatterns = [
    path('', views.index, name="index"),
    path('test/', views.test, name="test"),
]