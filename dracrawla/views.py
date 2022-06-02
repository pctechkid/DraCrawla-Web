from django.shortcuts import render
from django.views.generic import View

# Create your views here.

class MyIndexView(View):
	def get(self, request):
		return render(request, 'index.html')

class Login(View):
	def get(self, request):
		return render(request, 'login.html')

class Register(View):
	def get(self, request):
		return render(request, 'register.html')

class ManageAccounts(View):
	def get(self, request):
		return render(request, 'manage-accounts.html')

class LoginHistory(View):
	def get(self, request):
		return render(request, 'login-history.html')

class CreateAnnouncements(View):
	def get(self, request):
		return render(request, 'create-announcements.html')

class HistoricalData(View):
	def get(self, request):
		return render(request, 'historical-data.html')