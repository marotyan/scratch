from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route('/')
def index():
    with open('data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return render_template('index.html', data=data)

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/seihin')
def seihin_page():
    return render_template('seihin.html')

@app.route('/company')
def company():
    return render_template('company.html')

@app.route('/test')
def test():
    return render_template('test.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5005)
