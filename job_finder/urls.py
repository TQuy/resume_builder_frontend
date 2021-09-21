from django.urls import path
from job_finder import views

app_name = 'job_finder'
urlpatterns = [
    path('', views.index, name='index'),
    path("accounts/login/", views.login_view, name='login'),
    path("accounts/logout/", views.logout_view, name='logout'),
    path("accounts/register/", views.register, name="register"),
    path('list_resume/', views.list_resume),
    path('save_resume/', views.save_resume),
    path('load_resume/<int:resume_id>/', views.load_resume),
    path('delete_resume/<int:resume_id>/', views.delete_resume),
]
