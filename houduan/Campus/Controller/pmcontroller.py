from flask import jsonify, request
from Models.Models import Message,Account
from database import db
from sqlalchemy import or_,and_
import datetime


def get_pm():
    try:
        sender = request.headers.get('Authorization')
        receiver = request.json['receiver']
        # 查询数据库获取符合条件的消息记录，并按照时间排序

        messages = Message.query.filter(
            or_(
                (Message.sender == sender) & (Message.receiver == receiver),
                (Message.sender == receiver) & (Message.receiver == sender)
            )
        ).order_by(Message.time).all()
        # print(messages)
        # 构建要返回的消息数据字典列表
        messages_data = [serialize_message(message) for message in messages]

        response = {'status': 'success', 'messages': messages_data}
    except Exception as e:
        response = {'status': 'error', 'message': str(e)}

    return jsonify(response)


def serialize_message(message):
    return {
        'sender': message.sender,
        'receiver': message.receiver,
        'content': message.content,
        'time': message.time.strftime('%Y-%m-%d %H:%M:%S')
    }


def send_pm():
    sender = request.headers['Authorization']
    receiver = request.json['receiver']
    content = request.json['content']
    time = datetime.datetime.now()
    message = Message(sender=sender, receiver=receiver, content=content, time=time)

    try:
        db.session.add(message)
        db.session.commit()
        response = {'status': 'success', 'message': 'Private message sent successfully.'}
    except Exception as e:
        response = {'status': 'error', 'message': str(e)}

    return jsonify(response)


def set_pmlist():
    try:
        sender = request.headers['Authorization']
        receiver = request.json['receiver']
        account1 = Account.query.filter_by(j_username=sender).first()
        account2 = Account.query.filter_by(j_username=receiver).first()

        if account1.pmlist:
            s_oldpm = account1.pmlist.split(',')
        else:
            s_oldpm = []

        if account2.pmlist:
            r_oldpm = account2.pmlist.split(',')
        else:
            r_oldpm = []

        if receiver not in s_oldpm:
            if account1.pmlist:
                s_newpm = account1.pmlist + ',' + receiver
            else:
                s_newpm = receiver
            account1.pmlist = s_newpm

        if sender not in r_oldpm:
            if account2.pmlist:
                r_newpm = account2.pmlist + ',' + sender
            else:
                r_newpm = sender
            account2.pmlist = r_newpm
        db.session.commit()
        response = {'status': 'success', 'message': 'pmlist message updated successfully.'}
    except Exception as e:
        response = {'status': 'error', 'message': str(e)}

    return jsonify(response)


def delete_from_pmlist():
    try:
        sender = request.headers['Authorization']
        receiver = request.json['receiver']
        account1 = Account.query.filter_by(j_username=sender).first()
        # account2 = Account.query.filter_by(j_username=receiver).first()

        if account1.pmlist is not None:
            s_oldpm = account1.pmlist.split(',')
        else:
            s_oldpm = []

        # if account2.pmlist is not None:
        #     r_oldpm = account2.pmlist.split(',')
        # else:
        #     r_oldpm = []

        if receiver in s_oldpm:
            s_oldpm.remove(receiver)
            account1.pmlist = ','.join(s_oldpm)

        # if sender in r_oldpm:
        #     r_oldpm.remove(sender)
        #     account2.pmlist = ','.join(r_oldpm)

        # 提交更改到数据库
        db.session.commit()

        response = {'status': 'success', 'message': 'pmlist message deleted successfully.'}
    except Exception as e:
        # 回滚更改
        db.session.rollback()
        response = {'status': 'error', 'message': str(e)}

    return jsonify(response)



