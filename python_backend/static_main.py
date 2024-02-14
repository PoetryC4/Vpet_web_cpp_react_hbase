from flask import Flask, render_template
from flask_cors import CORS

from common.Constants import server

app = Flask(__name__)

# 设置静态资源映射，将 'images' 文件夹映射到 '/images' 路径
app.static_folder = 'E:/scl/pet_ques/src/main/resources/front'
app.static_url_path = '/static/'

# 启用 CORS 支持
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, host=server.get("host"), port=server.get("static_port"))
