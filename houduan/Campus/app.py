from configparser import ConfigParser

from flask import Flask
from flask_cors import CORS
from database import db

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # 禁用 SQLAlchemy 的跟踪修改功能，从而提高性能
# app.config['SQLALCHEMY_DATABASE_URI'] = ''

# CORS(app)
# cors = CORS(app, resources={r"/*": {"origins": "*", "supports_credentials": True}})
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:2408676557@localhost/campus_project'
# 配置数据库连接
config = ConfigParser()
config.read('config.ini')
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{config.get('DEFAULT', 'MYSQL_USER')}:" \
                                        f"{config.get('DEFAULT', 'MYSQL_PASSWORD')}@" \
                                        f"{config.get('DEFAULT', 'MYSQL_HOST')}/" \
                                        f"{config.get('DEFAULT', 'MYSQL_DB')}"

# db = SQLAlchemy(app)
db.init_app(app)

if __name__ == '__main__':
    from Controller.logincontroller import login, adlogin, register

    app.add_url_rule('/login', 'login', login, methods=['POST'])  # 登录接口
    app.add_url_rule('/adlogin', 'adlogin', adlogin, methods=['POST'])  # 登录接口
    app.add_url_rule('/register', 'register', register, methods=['POST'])  # 注册接口

    # 导入接口函数
    from Controller.editcontroller import edit_account, edit_labels

    # 注册接口路由
    app.add_url_rule('/edit_account', 'edit_account', edit_account, methods=['POST'])  # 编辑个人信息
    app.add_url_rule('/edit_labels', 'edit_labels', edit_labels, methods=['POST'])
    from test import testsuccess

    app.add_url_rule('/test', 'test success', testsuccess, methods=['GET'])

    from Controller.likedcontroller import save_like, get_liked_users, if_like

    app.add_url_rule('/save_like', 'save_like', save_like, methods=['POST'])  # 给别人点赞（发送被点赞者学号）

    app.add_url_rule('/get_liked_users', 'get_liked_users', get_liked_users, methods=['GET'])  # 获取相互点赞的人的信息

    app.add_url_rule('/if_like', 'if_like', if_like, methods=['POST'])  # 查看用户有没有给当前查看的页面的用户点赞

    from Controller.getmessagecontroller import get_message, search_users, get_other_user_message, get_hobbies

    app.add_url_rule('/get_message', 'get_message', get_message, methods=['GET'])  # 获取本用户的信息
    app.add_url_rule('/get_other_user_message', 'get_other_user_message', get_other_user_message,
                     methods=['POST'])  # 获取其他用户的信息
    app.add_url_rule('/search_users', 'search_users', search_users, methods=['POST'])  # 搜索用户
    app.add_url_rule('/get_hobbies', 'get_hobbies', get_hobbies, methods=['GET'])  # 获取所有爱好

    from Controller.recommendcontroller import recommend_users

    app.add_url_rule('/recommend_users', 'recommend_users', recommend_users, methods=['GET'])  # 推荐用户

    from Controller.logincontroller import home, encryptByDES

    app.add_url_rule('/encryptByDES', 'encryptByDES', encryptByDES, methods=['POST'])  # 发送密码，返回加密后的密码
    app.add_url_rule('/home', 'home', home, methods=['GET'])

    from Controller.getimage import get_avatar, upload

    app.add_url_rule('/get_avatar/<filename>', 'get_avatar', get_avatar, methods=['GET'])
    app.add_url_rule('/upload', 'upload', upload, methods=['POST'])

    from Controller.reportcontroller import get_report, save_report, ban_user, get_ban_list, unban_user,change_status

    app.add_url_rule('/get_report', 'get_report', get_report, methods=['GET'])
    app.add_url_rule('/save_report', 'save_report', save_report, methods=['POST'])
    app.add_url_rule('/ban_user', 'ban_user', ban_user, methods=['POST'])
    app.add_url_rule('/get_ban_list', 'get_ban_list', get_ban_list, methods=['GET'])
    app.add_url_rule('/unban_user', 'unban_user', unban_user, methods=['POST'])
    app.add_url_rule('/change_status', 'change_status', change_status, methods=['POST'])

    from Controller.pmcontroller import get_pm, send_pm, set_pmlist, delete_from_pmlist

    app.add_url_rule('/get_pm', 'get_pm', get_pm, methods=['POST'])
    app.add_url_rule('/send_pm', 'send_pm', send_pm, methods=['POST'])
    app.add_url_rule('/set_pmlist', 'set_pmlist', set_pmlist, methods=['POST'])
    app.add_url_rule('/delete_from_pmlist', 'delete_from_pmlist', delete_from_pmlist, methods=['POST'])

    app.run(host='0.0.0.0', port=5000)
