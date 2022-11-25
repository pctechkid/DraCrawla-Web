from django.db import models
# from datetime import datetime


# Create your models here.

class Account(models.Model):
    uid = models.BigAutoField(primary_key = True)
    first_name = models.CharField(max_length = 50)
    last_name = models.CharField(max_length = 50)    
    email = models.CharField(max_length = 50, unique = True)
    username = models.CharField(max_length = 100, unique = True)
    password = models.CharField(max_length = 200) 
    timein = models.DateTimeField(auto_now_add=True)
    timeout = models.DateTimeField(blank = True, null=True)

class SuperAdmin(models.Model):
    aid = models.AutoField(primary_key = True)
    username = models.CharField(max_length = 50)
    password = models.CharField(max_length = 30)

# class LogHistory(Account):
#     timein = models.DateField(default=datetime.now(),blank=True)
#     timeout = models.DateField(blank=True, null=True)

class Annoucement(models.Model):
    id = models.AutoField(primary_key = True)
    title = models.CharField(max_length=1000)
    content = models.CharField(max_length=1000)#longtext,
    date = models.DateField()
    isApproved = models.BooleanField(default=True)

class Drainage(models.Model):
    did = models.AutoField(primary_key = True)
    size = models.IntegerField()
    shape = models.CharField(max_length=50)
    waterlevel = models.IntegerField()
    blockage = models.BooleanField(default=False)
    # long = models.DecimalField(max_digits=, decimal_places=)
    # lat = models.DecimalField(max_digits=, decimal_places=)

























