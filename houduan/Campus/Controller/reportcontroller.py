import datetime
from flask import request, jsonify
from sqlalchemy import text
import datetime
from sqlalchemy.dialects.mssql.information_schema import columns
from sqlalchemy.orm import class_mapper

from Models.Models import Report, Ban

from database import db


def save_report():
    reporter = request.headers.get('Authorization')
    reported_username = request.json['reported_username']  # 被点赞者的j_username
    report_info = request.json['report_info']
    itype = request.json['itype']
    status_value = "未处理"
    current_time = datetime.datetime.now()
    sqlstr = "INSERT INTO report (reporter, reported_username, message, time, itype,status) VALUES (:reporter, :reported_username, :report_info, :current_time,:itype,:status_value)"

    # sqlstr="INSERT INTO report (reporter,reported_username,message) VALUES (:reporter, :reported_username,:report_info)"

    insert_query = text(sqlstr)
    try:
        db.session.execute(insert_query,
                           {'reporter': reporter, 'reported_username': reported_username, 'report_info': report_info,
                            'current_time': current_time, 'itype': itype,'status_value':status_value})
        db.session.commit()
        response = {'status': 'success', 'message': 'Reported successfully.'}
    except Exception as e:
        response = {'status': 'error', 'message': str(e)}
    return jsonify(response)


def get_report():
    try:
        reports = Report.query.all()

        # 构建要返回的信息字典列表
        # reports_data = [serialize_report(report,id) for report in reports]
        reports_data = [serialize_report(report, id + 1) for id, report in enumerate(reports)]

        response = {'status': 'success', 'reports': reports_data}
    except Exception as e:
        response = {'status': 'error', 'message': str(e)}
    # querry=text("select * from report")
    # result = db.session.execute(querry)
    return jsonify(response)

def change_status():
    try:
        id = request.json['id']
        data = Report.query.filter_by(id=id).first()
        data.status = "已处理"
        db.session.commit()
        # account = Account.query.filter_by(j_username=j_username).first()
        return jsonify({"status": "success"})
    except Exception as e:
        response = {'status': 'error', 'message': str(e)}

    return jsonify(response)



def serialize_report(report, id):
    return {
        'id': report.id,
        'reporter': report.reporter,
        'reported_username': report.reported_username,
        'message': report.message,
        'time': report.time.date().strftime('%Y-%m-%d'),
        'itype': report.itype,
        'status':report.status
    }
# def serialize_report(report):
#     # columns = [column.key for column in class_mapper(Report).columns]
#     # return {column: getattr(report, column) for column in columns}
#      columns = [column.key for column in report.__table__.columns]
#      return {column: getattr(report, column) for column in columns}


def ban_user():
    data = request.get_json()
    j_username = data.get('username')
    reason = data.get('reason')
    duration = data.get('duration')  # 封禁时长（天）

    if not j_username:
        return jsonify({'message': 'Missing username'})

    # 检查用户是否已经被封禁
    account = Ban.query.filter_by(j_username=j_username).first()  # 返回第一个对象
    # existing_ban = Ban.query.get(j_username)
    if account:
        return jsonify({'message': 'User already banned'})# , 400

    # 计算封禁时间和解封时间
    now = datetime.date.today()
    ban_start = now
    ban_end = now
    if duration:
        ban_end += datetime.timedelta(days=int(duration))

    # 创建封禁记录
    ban = Ban(j_username=j_username, banreason=reason, banstart=ban_start, banend=ban_end,unbantime=duration)
    db.session.add(ban)
    db.session.commit()

    return jsonify({'message': 'User banned successfully'}), 200


def get_ban_list():
    bans = Ban.query.all()

    ban_list = []
    for ban in bans:
        ban_data = {
            'j_username': ban.j_username,
            'reason': ban.banreason,
            'start_date': ban.banstart.strftime('%Y-%m-%d'),
            'end_date': ban.banend.strftime('%Y-%m-%d')
        }
        ban_list.append(ban_data)

    return jsonify({'bans': ban_list}), 200


def unban_user():
    data = request.get_json()
    j_username = data.get('j_username')

    if not j_username:
        return jsonify({'message': 'Missing username'})  #, 400

    # 检查用户是否被封禁
    ban = Ban.query.get(j_username)
    if not ban:
        return jsonify({'message': 'User not banned'})#  , 400

    # 解封用户
    db.session.delete(ban)
    db.session.commit()

    return jsonify({'message': 'User unbanned successfully'}), 200