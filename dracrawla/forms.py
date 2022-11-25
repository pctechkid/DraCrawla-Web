from django import forms
from .models import *
from django import forms
from .models import *



class AccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields= '__all__'

    # def clean_username(self):
    #     username = self.cleaned_data['username']
    #     if Account.objects.filter(username=username).exists():
    #         raise forms.ValidationError(u'Username %s is already in use.' % username)
    #     return username

class AnnouncementForm(forms.ModelForm):
    class Meta:
        model = Annoucement
        fields= '__all__'

class DrainageForm(forms.ModelForm):
    class Meta:
        model = Drainage
        fields= '__all__'



