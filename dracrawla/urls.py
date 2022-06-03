from django.contrib import admin
from django.urls import path
from dracrawla import views
from django.conf import settings
from django.conf.urls.static import static




app_name = 'dracrawla'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.MyIndexView.as_view(), name="my_index_web"),
    path('login', views.Login.as_view(), name="login_view"),
    path('register', views.Register.as_view(), name="register_view"),
    path('manage-accounts', views.ManageAccounts.as_view(), name="manageaccounts_view"),
    path('login-history', views.LoginHistory.as_view(), name="loginhistory_view"),
    path('create-announcements', views.CreateAnnouncements.as_view(), name="createannouncements_view"),
    path('historical-data', views.HistoricalData.as_view(), name="historicaldata_view"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
