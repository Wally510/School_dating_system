from flask import Flask, send_from_directory, request
import os

app = Flask(__name__)

# @app.route('/avatars/<filename>')
# 获取当前文件的目录路径
current_dir = os.path.dirname(os.path.abspath(__file__))
# 构建 avatars 目录的相对路径
avatars_dir = os.path.join(current_dir, '..', 'avatars')


def get_avatar(filename):
    # avatars_dir = 'Campus/avatars'  # 头像图片存放的目录
    return send_from_directory(avatars_dir, filename)  # 从指定目录发送文件


# def set_avatar()

def upload():
    # avatars_dir = '../avatars'  # 头像图片存放的目录

    # 检查是否存在avatars目录，若不存在则创建
    if not os.path.exists(avatars_dir):
        os.makedirs(avatars_dir)
    print(request.files)
    if 'avatar' in request.files:
        file = request.files['avatar']  # 获取前端传递的文件
        # filename = file.filename
        filename=request.headers.get('Authorization')
        filename=filename+'.jpg'
        filepath = os.path.join(avatars_dir, filename)  # 拼接保存的文件路径
        file.save(filepath)  # 保存文件到指定路径
        return '文件上传成功！'
    else:
        return '未找到文件！'
