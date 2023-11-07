from flask import Flask, render_template, request,redirect, url_for,send_file, flash, session
import sqlite3
import subprocess
import hashlib
import base64
import os
from Module import *

app = Flask(__name__,static_url_path='/static')
app.config["SECRET_KEY"] = "ABCD"

SQL_FILTER = ["select","union","delete","update","create","table","insert","column","admin"]


@app.route('/',methods=['GET'])
def main():
    if 'username' in session:
        return render_template('index.html',username=session['username'],balance=session['balance'])
    return redirect('/login')

@app.route('/board',methods=['GET','POST'])
def board():
    if 'username' not in session:
        return redirect('/login')
    if request.method == 'GET':
        files = []
        path = './bbs'
        filename = os.listdir(path)
        return render_template('board.html',filename=filename)

    if request.method == 'POST':
        title = request.form['title'].encode('utf-8')
        content = request.form['content'].encode('utf-8')
        if b'..' in title:
            return redirect('/board')
        argv = [b'2',b'./bbs/'+title,content]
        process = subprocess.Popen(["./board"]+argv, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate(input=b'')
        return redirect('/board')
        

@app.route('/view',methods=['GET'])
def view():
    if 'username' in session:
        filename = request.args.get('filename')
        title = filename.encode('utf-8')
        argv = [b'1',b'./bbs/'+title,b'content']
        process = subprocess.Popen(["./board"]+argv, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate(input=b'')
        text = stdout.decode('utf-8')
        return render_template('view.html',filename=filename,text=text)
    return redirect('/login')
    
@app.route('/game1', methods=['GET','POST'])
def game1():
    if 'username' not in session:
        return redirect('/login')

    if request.method == 'GET':
        return render_template('game1.html')

    if request.method == 'POST': 
        try:
            input = base64.b64decode(request.form['input'])
        except:
            input = request.form['input'].encode('utf-8')

        process = subprocess.Popen("./games/game1", stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # 바이트 데이터를 외부 프로세스로 전달 (표준 입력으로)
        stdout, stderr = process.communicate(input=input)
        num_idx = stdout.find(b'Number')
        result = stdout[num_idx+8:num_idx+17].decode('utf-8')
        
        flag = False
        if result == '777777777':
            flag = True
            
        num_list = list(map(int, str(result)))

        return render_template('game1.html',result = num_list,flag=flag)

@app.route('/game2', methods=['GET','POST'])
def game2():
    if 'username' not in session:
        return redirect('/login')

    if request.method == 'GET':
        return render_template('game2.html',coin_num=0)

    if request.method == 'POST': 
        try:
            input = base64.b64decode(request.form['input'])
        except:
            input = request.form['input'].encode('utf-8')

        edit_balance(session,-1)
        res = execute('./games/game2',[],input)

        coin_num = 0
        flag = False
        coin_num = res[0]
        if res[1] == '1':
            result = True
            edit_balance(session,1)
        elif res[1] == '2':
            result = False
        if res[2] == 'flag':
            flag = True


        return render_template('game2.html',coin_num = coin_num, result = result,flag = flag)



@app.route('/game3', methods=['GET','POST'])
def game3():
    if 'username' not in session:
        return redirect('/login')

    if request.method == 'GET':
        return render_template('game3.html',balance=session['balance'], result = 0)

    if request.method == 'POST': 
        money = request.form['money']
        target = request.form['target']

        if int(money) <= 0:  
            flash("Bet amount more than zero")
            return redirect('/game3')

        if int(target) not in [1,3,5,10,20]:
            flash("Target value must be 1,3,5,10,20")
            return redirect('/game3')

        edit_balance(session,-1*int(money))
        result = execute('./games/game3',[target,money],b'')

        earn = int(result[1])
        success = False
        if target==result[0]:
            edit_balance(session,earn)
            success = True

        return render_template('game3.html', balance=session['balance'],result = result[0],success = success,earn = earn)

@app.route('/game4', methods=['GET','POST'])
def game4():
    if 'username' not in session:
        return redirect('/login')

    if request.method == 'GET':
        return render_template('game4.html',balance=session['balance'])

    if request.method == 'POST': 
        try:
            input = base64.b64decode(request.form['input'])
        except:
            input = request.form['input'].encode('utf-8')


        edit_balance(session,-1)
        res = execute('./games/game4',[],input)
        dice_num = [res[0],res[1]]

        if res[3] == 'win':
            edit_balance(session,+1)
            result = True
        elif res[3] == 'lose':
            result = False

        flag = False
        if res[4] == 'flag':
            flag = True
        return render_template('game4.html',dice_num=dice_num, result = result,flag = flag,balance=session['balance'])


@app.route('/login', methods=['GET','POST'])
def login():
    if 'username' in session:
        return redirect('/')

    if request.method == 'GET':
        return render_template('login.html')

    if request.method == 'POST': 
        id = request.form['id']
        pw = request.form['pw']
        for filters in SQL_FILTER:
            if filters in id.lower():
                flash("No hack^_^")
                return redirect("/login")
        hash_pw = hashlib.sha256(pw.encode()).hexdigest()
        program = './login'

        arguments = [id, hash_pw]
        process = subprocess.Popen([program] + arguments,stdin=subprocess.PIPE,stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate(input = b'2')
        result = stdout.decode('utf-8').split('\n')
        print(result)
        if result[0] == 'Success':
            session['logged_in'] = True
            session['username'] = result[1]
            session['balance'] = int(result[2])
            return redirect('/')
        else:
            flash("Login Fail..")
            return redirect('/login')

@app.route('/register', methods=['GET','POST'])
def register():
    if 'username' in session:
        return redirect('/login')

    if request.method == 'GET':
        return render_template('register.html')

    if request.method == 'POST': 
        id = request.form['id']
        pw = request.form['pw']
        confirm_pw = request.form['confirm_pw']

        if not id or not pw or not confirm_pw:
            flash("Please fill all form")
            return redirect("/register")

        if pw != confirm_pw:
            flash("Confirm password not same")
            return redirect("/register")

        for filters in SQL_FILTER:
            if filters in id.lower():
                flash("No hack^_^")
                return redirect("/register")


        hash_pw = hashlib.sha256(pw.encode()).hexdigest()
        print(id,hash_pw)
        program = './login'
        arguments = [id, hash_pw]
        process = subprocess.Popen([program] + arguments,stdin=subprocess.PIPE,stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate(input = b'1')
        print(stdout,stderr)
        if stderr == b'used':
            flash("ID already been used.")
            return redirect("/register")
        return redirect("/login")



@app.route('/logout')
def get():
    # 세션 삭제
    session.pop('username', None)
    session.pop('logged_in', False)
    session.pop('balance', None)
    return redirect('/')

@app.errorhandler(500)
def internal_server_error(e):
    flash("500 internal server error.. Please enter valid input")
    return redirect(request.referrer)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5002)
