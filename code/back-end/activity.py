from flask import json
from datamanager import *


class Activity():
    __slots__ = ('id', 'name', 'description', 'club_id', 'place', 'start_time', 'end_time', 'lottery_time', 
                'lottery_method', 'max_number', 'registered_people_list', 'selected_people_list', 'fee', 'sign_up_ddl',
                'sponsor', 'undertaker')

    #max_id = 0
    def __init__(self, at_id=0, at_name='', at_description='', at_club_id=0, at_place='', at_start_time='', at_end_time='', 
                at_lottery_time='', at_lottery_method='', at_max_number=0, at_fee=0.0, at_sign_up_ddl='', at_sponsor='',
                 at_undertaker=''):
        #self.id = at_id
        #if at_id == -1 :
        #    self.id = Activity.max_id + 1  
        #    Activity.max_id += 1    #自增
        #else:
        #    self.id = at_id    
        self.id = at_id
        self.name = at_name
        self.description = at_description
        self.club_id = at_club_id
        self.place = at_place
        self.start_time = at_start_time
        self.end_time = at_end_time
        self.lottery_time = at_lottery_time
        self.lottery_method = at_lottery_method
        self.max_number = at_max_number
        self.fee = at_fee #费用
        self.sign_up_ddl = at_sign_up_ddl  #报名截止时间
        self.sponsor = at_sponsor #赞助方
        self.undertaker = at_undertaker  #承办方
        self.registered_people_list = [] #报名的人员名单
        self.selected_people_list = [] #选上的人员名单

    def change_description(self, new_description):
        self.description = new_description

    def change_place(self, new_place):
        self.place = new_place

    def change_start_time(self, new_start_time):
        self.start_time = new_start_time
    
    def change_end_time(self, new_end_time):
        self.end_time = new_end_time

    def change_lottery_time(self, new_lottery_time):
        self.lottery_time = new_lottery_time

    def change_lottery_method(self, new_lottery_method):
        self.lottery_method = new_lottery_method

    def change_name(self, new_name):
        self.name = new_name

    def change_max_number(self, new_max_number):
        self.max_number = new_max_number

    #更改费用
    def change_fee(self, new_fee):
        self.fee = new_fee
    
    #更改报名截止日期
    def change_sign_up_ddl(self, new_sign_up_ddl):
        self.sign_up_ddl = new_sign_up_ddl

    #更改赞助方
    def change_sponsor(self, new_sponsor):
        self.sponsor = new_sponsor

    #更改承办方
    def change_undertaker(self, new_undertaker):
        self.undertaker = new_undertaker
    
    def add_registered_people(self, registered_wxid):
        if not registered_wxid in self.registered_people_list:
            self.registered_people_list.append(registered_wxid)
            return True
        else:
            return False

    def delete_registered_people(self, registered_wxid):
        if registered_wxid in self.registered_people_list:
            self.registered_people_list.remove(registered_wxid)
            return True
        else:
            return False

    def add_selected_people(self, selected_wxid):
        if not selected_wxid in self.selected_people_list:
            self.selected_people_list.append(selected_wxid)
            return True
        else:
            return False
        
    def delete_selected_people(self, selected_wxid):
        if selected_wxid in self.selected_people_list:
            self.selected_people_list.remove(selected_wxid)
            return True
        else:
            return False
    
    def Jsonfy(self):
        selected_username_list = []
        registered_username_list = []
        manager = DataManager(DataType.user)

        for i in self.registered_people_list:
            user = manager.getInfo(i)
            registered_username_list.append(user[0][1])
            #pass

        for i in self.selected_people_list:
            user = manager.getInfo(i)
            selected_username_list.append(user[0][1])
            #pass
        
        res = {'status':'200 OK', 'activity_id':self.id, 'activity_name':self.name, 'activity_description':self.description,
        'activity_club_id':self.club_id, 'activity_place':self.place, 'activity_start_time':self.start_time, 
        'activity_end_time':self.end_time, 'activity_lottery_time':self.lottery_time, 'activity_lottery_method':self.lottery_method,
        'activity_max_number':self.max_number, 'activity_registered_people':registered_username_list,
        'activity_selected_people':selected_username_list, 'activity_fee':self.fee, 'activity_sign_up_ddl':self.sign_up_ddl,
        'activity_sponsor':self.sponsor, 'activity_undertaker':self.undertaker}

        return json.dumps(res)



if __name__=='__main__':
    pass




    
