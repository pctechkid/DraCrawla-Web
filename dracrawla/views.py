from asyncio.windows_events import NULL
from contextlib import nullcontext
from django.views.generic import View, TemplateView
from dracrawla.forms import AccountForm, AnnouncementForm,DrainageForm
from dracrawla.models import Account, Annoucement, SuperAdmin, Drainage
from django.shortcuts import render, redirect
from django.views.generic import View
from django.http import HttpResponse
from django.shortcuts import redirect
from datetime import datetime
from passlib.hash import pbkdf2_sha256
from cryptography.fernet import Fernet
from django.views import static
# from ip2geotools.databases.noncommercial import DbIpCity


# Create your views here.
def listToString(list):
    length = len(list)
    if length == 0 :
        return ""
    elif length == 1 :
        return "{}".format(list[0])
    else:
        strings = ["{}".format(x) for x in list[:-1]]
        return "{} and {}".format(", ".join(strings), list[-1])

def logout(request):
    try:
        del request.session['usern']
        request.session.flush()
    except KeyError:
        pass
    return redirect('dracrawla:login_view')

def logoutadmin(request):
    try:
        del request.session['admin']
        request.session.flush()
    except KeyError:
        pass
    return redirect('dracrawla:login_view')

class MainPok(View):
    def get(self, request):
        context = {
            'user': {},
            'drainage': []
        }
        if 'usern' in request.session:
            current_user=request.session['usern']
            drainage = Drainage.objects.all()
            user=Account.objects.filter(username=current_user)
            context = {'user':user,
            'drainage':drainage,
                            }
        elif 'admin' in request.session:
            current_user=request.session['admin']
            puser = Account.objects.all()
            drainage = Drainage.objects.all()
            user=SuperAdmin.objects.filter(username=current_user)
            context = {'user':user,
            'drainage':drainage,
                        }
        else:
            return redirect('dracrawla:login_view');
        return render(request, 'main2.html',context)
    def post(self, request):
        print("im in outsite")
        form = DrainageForm(request.POST)        
        if form.is_valid():
            # try:
            print("im in")

            Id = request.POST.get("did")            
            drainagesize = request.POST.get("size")
            dshape = request.POST.get("shape")
            dwaterlevel = request.POST.get("waterlevel")
            if (request.POST.get("blockage") == 'on'):
                isblocked = True
            else:
                isblocked = False

            form = Drainage(did = Id, size=drainagesize, shape=dshape, waterlevel=dwaterlevel, blockage=isblocked)
            print('clicked')
            form.save()

                    
            return redirect('dracrawla:main_view')
            # except:
            #   raise Http404

        if request.method == 'POST':
            if 'BtnUpdate' in request.POST:
                print('update button clicked')

                Id = request.POST.get("uid-uid")                                                                                                                                                                                                                                                                                                                                            
                dsize = request.POST.get("drainage_size")
                dshape = request.POST.get("drainage_shape")             
                dwaterlevel = request.POST.get("drainage_waterlevel")
                if (('drainage_blockage' not in request.POST)):
                    isblockage = False
                else:
                    isblockage = True

                update_drainage = Drainage.objects.filter(did=Id).update(size = dsize, 
                 shape=dshape, waterlevel=dwaterlevel, blockage=isblockage)
                print(update_drainage)
                print('updated')
                
            elif 'BtnDelete' in request.POST:
                print('delete button clicked')
                Id = request.POST.get("drain-did")
                announce = Drainage.objects.filter(did=Id).delete()
                print("deleted")

        return redirect('dracrawla:main_view')



class MyIndexView(View):
    def get(self, request):
        if 'usern' in request.session:
            current_user=request.session['usern']
            user=Account.objects.filter(username=current_user)
            context = {'user':user,
                        }
        elif 'admin' in request.session:
            current_user=request.session['admin']
            user=SuperAdmin.objects.filter(username=current_user)
            context = {'user':user,
                        }
            print(current_user)
        else:
            return redirect('dracrawla:login_view')
        
        return render(request, 'index.html',context)

class Login(View):

    def get(self, request):
        return render(request,'login.html')

    def post(self, request):
        if request.method == 'POST':

            username = request.POST.get("username")
            password = request.POST.get("password")
            check_admin = SuperAdmin.objects.filter(username=username, password=password)
            if check_admin:
                request.session['admin'] = username
                if SuperAdmin.objects.filter(username=username).count()>0:    
                    return redirect('dracrawla:my_index_web')

            check_password = Account.objects.filter(username=username).values_list("password",flat=True)
            listpw = list(check_password)
            dec_password = pbkdf2_sha256.verify(password, listToString(listpw))
            check_username = Account.objects.filter(username=username)
            
            # check_user = Account.objects.filter(username=username, password=check_password)
            check_admin = SuperAdmin.objects.filter(username='superadmin', password='superadmin')
            otime = datetime.now()
            print(otime)
            updatetime = Account.objects.filter(username=username).update(timein=otime, timeout=otime)
            print(updatetime) 
            # print(dec_password)
            # print(check_user)
            # print(check_password)
            if check_username and dec_password:
                request.session['usern'] = username
                if Account.objects.filter(username=username).count()>0:                   
                        return redirect('dracrawla:my_index_web')
            else:   
                    return HttpResponse('not user')    

        else:   

            return render(request,"register.html")  

class Register(View):
  
    def get(self, request):
        if 'usern' in request.session:
            current_user=request.session['usern']
            user=Account.objects.filter(username=current_user)
        elif 'admin' in request.session:
            current_user=request.session['admin']
            user=SuperAdmin.objects.filter(username=current_user)
            context = {'user':user,
                        }
        else:
            return redirect('dracrawla:login_view')
        context = {
                'user' : user
                }
        return render(request, 'register.html',context)
        
    def post(self, request):        
        form = AccountForm(request.POST)  

        if form.is_valid():

            Uid = request.POST.get("uid")    
            Fname = request.POST.get("first_name")      
            Lname = request.POST.get("last_name")     
            Email = request.POST.get("email")
            Username = request.POST.get("username")
            Password = request.POST.get("password")
            enc_password = pbkdf2_sha256.encrypt(Password, rounds=12000, salt_size=32)
            form = Account(uid = Uid, first_name = Fname, last_name = Lname, email = Email, username = Username, password=enc_password)
            print('clicked')
            form.save() 
      
            return redirect('dracrawla:login_view')

        else:
            print(form.errors)
            return HttpResponse('not valid')  



class ManageAccounts_superadmin(View):
    def get(self, request):
        if 'admin' in request.session:
            current_user=request.session['admin']
            admin=SuperAdmin.objects.filter(username=current_user)
            user = Account.objects.all()
            context = {
                'admin':admin,
                'user':user,
                        }
            print(current_user)
        else:
            return redirect('dracrawla:login_view')
        return render(request,'manage-accounts_superadmin.html', context)

    def post(self, request):
        if request.method == 'POST':
            if 'btnUpdate' in request.POST:
                print('update button clicked')
                Idn = request.POST.get("uid-uid")                                                                                                                                                                                                                                                              
                Email = request.POST.get("email-email")             
                Username = request.POST.get("user-name")
                Password = request.POST.get("pass-word")
                update_user = Account.objects.filter(uid=Idn).update(email = Email, username = Username, password = Password)
                print(update_user)
                print('user updated')               

            elif 'btnDelete' in request.POST:
                print('delete button clicked')
                Idn = request.POST.get("iidn-idn")
                account = Account.objects.filter(uid=Idn).delete()

                print('recorded deleted')
                
        return redirect('dracrawla:manageaccounts_view_superadmin') 

class ManageAccounts(View):
    def get(self, request):
        if 'usern' in request.session:
            current_user = request.session['usern']
            pok = Account.objects.filter(username=current_user)
            user = Account.objects.all()
            context = {
                'user' : user,
                'current_user': pok,
                }
        else:
            return redirect('dracrawla:login_view')
        return render(request,'manage-accounts.html', context)
            
    # def post(self, request):
    #     if request.method == 'POST':
    #         if 'btnUpdate' in request.POST:
    #             print('update button clicked')
    #             Idn = request.POST.get("uid-uid")                                                                                                                                                                                                                                                              
    #             Email = request.POST.get("email-email")             
    #             Username = request.POST.get("user-name")
    #             Password = request.POST.get("pass-word")

    def post(self, request):
        if request.method == 'POST':
            if 'btnUpdate' in request.POST:
                print('update button clicked')
                Idn = request.POST.get("uid-uid")  
                Fname = request.POST.get("first_name")        
                Lname = request.POST.get("last_name")                                                                                                                                                                                                                                                   
                Email = request.POST.get("email-email")             
                Username = request.POST.get("user-name")
                update_user = Account.objects.filter(uid=Idn).update(email = Email, username = Username, first_name = Fname, last_name = Lname)
                print(update_user)
                print('user updated')               

            elif 'btnDelete' in request.POST:
                print('delete button clicked')
                Idn = request.POST.get("iidn-idn")
                account = Account.objects.filter(uid=Idn).delete()

                print('recorded deleted')
    

        return redirect('dracrawla:manageaccounts_view')    

class LoginHistory(View):
    def get(self, request):
        if 'usern' in request.session:
            puser = Account.objects.all()
            current_user=request.session['usern']
            user=Account.objects.filter(username=current_user)
            context = {
                'puser' : puser,
                'user':user
                }
        elif 'admin' in request.session:
            current_user=request.session['admin']
            puser = Account.objects.all()
            user=SuperAdmin.objects.filter(username=current_user)
            context = {'user':user,
            'puser' : puser,
                        }
        else:
            return redirect('dracrawla:login_view')

        return render(request,'login-history.html',context)
        



class HistoricalData(View):
    def get(self, request):
        if 'usern' in request.session:
            puser = Account.objects.all()
            current_user=request.session['usern']
            user=Account.objects.filter(username=current_user)
            context = {
                'puser' : puser,
                'user':user
                }
        elif 'admin' in request.session:
            current_user=request.session['admin']
            puser = Account.objects.all()
            user=SuperAdmin.objects.filter(username=current_user)
            context = {'user':user,
                        }
        else:
            return redirect('dracrawla:login_view')
        return render(request, 'historical-data.html')

class Main(View):
    def get(self, request):
        context = {'user': {}, 'drainage': []}
        if 'usern' in request.session:
            current_user=request.session['usern']
            drainage = Drainage.objects.all()
            user=Account.objects.filter(username=current_user)
            context = {'user':user,
            'drainage':drainage,
                            }
        elif 'admin' in request.session:
            current_user=request.session['admin']
            puser = Account.objects.all()
            drainage = Drainage.objects.all()
            user=SuperAdmin.objects.filter(username=current_user)
            context = {'user':user,
            'drainage':drainage,
        }
        return render(request, 'main.html',context)
    


# class DisplayAnnouncements(View):
#     def get(self, request):
#         return render(request, 'display-announcement.html')

# class CreateAnnouncements(View):
#     def get(self, request):
#         return render(request, 'create-announcements.html')

class CreateAnnouncements(View):
    
    def get(self, request):
        if 'usern' in request.session:
            current_user = request.session['usern']
            user=Account.objects.filter(username=current_user)
            pok = Account.objects.filter(username=current_user)
            puser = Account.objects.all()
            viewannouncement = Annoucement.objects.all()
            context = {
                'puser' : puser,
                'user' : user,
                'viewannouncement':viewannouncement
                }
        elif 'admin' in request.session:
            current_user=request.session['admin']
            puser = Account.objects.all()
            user=SuperAdmin.objects.filter(username=current_user)
            viewannouncement = Annoucement.objects.all()
            context = {'user':user,
            'puser' : puser,
            'viewannouncement':viewannouncement,
                        }

            # pantawag sa html sa table
       
        return render(request,'create-announcements.html', context)


    def post(self, request):        
        form = AnnouncementForm(request.POST)        
       
        if form.is_valid():
            # try:

            Id = request.POST.get("id")            
            Title = request.POST.get("title")
            Content = request.POST.get("content")
            Date = request.POST.get("date")
            if (request.POST.get("isApproved") == 'on'):
                isapproved = True
            else:
                isapproved = False

            form = Annoucement(id = Id, title=Title, content=Content, date=Date, isApproved=isapproved)
            print('clicked')
            form.save()

                    
            return redirect('dracrawla:createannouncements_view')
            # except:
            #   raise Http404

        if request.method == 'POST':
            if 'BtnUpdate' in request.POST:
                print('update button clicked')

                Id = request.POST.get("id-id")                                                                                                                                                                                                                                                                                                                                            
                Title = request.POST.get("title-title")
                Content = request.POST.get("content-content")             
                Date = request.POST.get("date-date")
                if (('isApproved-isApproved' not in request.POST)):
                    isapproved = False
                else:
                    isapproved = True

                update_announcement = Annoucement.objects.filter(id=Id).update(title = Title, 
                 content=Content, date=Date, isApproved=isapproved)
                print(update_announcement)
                print('updated')
                
            elif 'BtnDelete' in request.POST:
                print('delete button clicked')
                Id = request.POST.get("id-id")
                announce = Annoucement.objects.filter(id=Id).delete()

        return redirect('dracrawla:createannouncements_view')


# class DisplayAnnouncements(View):
#     def get(self, request):
#         return render(request, 'display-announcement.html')

class DisplayAnnouncements(View):
    def get(self, request):
        if 'usern' in request.session:
            current_user = request.session['usern']
            user=Account.objects.filter(username=current_user)
            pok = Account.objects.filter(username=current_user)
            puser = Account.objects.all()
            viewannouncement = Annoucement.objects.all()
            context = {
                'puser' : puser,
                'user' : user,
                'viewannouncement':viewannouncement
                }
        elif 'admin' in request.session:
            current_user=request.session['admin']
            puser = Account.objects.all()
            user=SuperAdmin.objects.filter(username=current_user)
            viewannouncement = Annoucement.objects.all()
            context = {'user':user,
            'puser' : puser,
            'viewannouncement':viewannouncement,
                        }
            # pantawag sa html sa table
        return render(request,'display-announcement.html', context)


    def post(self, request):
        if request.method == 'POST':
            if 'BtnUpdate' in request.POST:
                print('update button clicked')
                Id = request.POST.get("id-id")                                                                                                                                                                                                                                                                                                                                            
                Title = request.POST.get("title-title")
                Content = request.POST.get("content-content")             
                User = request.POST.get("user-user")
                Date = request.POST.get("date-date")
   
                update_announcement = Annoucement.objects.filter(id=Id).update(title = Title, 
                 content=Content, user=User, date=Date)
                print(update_announcement)
                print('Updated')
                
            elif 'BtnDelete' in request.POST:
                print('delete button clicked')
                Id = request.POST.get("id-id")
                announce = Annoucement.objects.filter(id=Id).delete()

        return redirect('dracrawla:displayannouncements_view')

