import sqlite3
from flask import session
import subprocess

def edit_balance(mysession,amount):
    conn = sqlite3.connect("momoland.db")
    cur = conn.cursor()
    cur.execute("UPDATE USERS SET balance = balance + ? where id = ?",(amount,mysession['username'],))
    conn.commit()
    conn.close()
    print(mysession['balance'],amount)
    mysession['balance'] += amount

def execute(process,argv,myinput):
    process = subprocess.Popen([process]+ argv,stdin=subprocess.PIPE,stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate(input=myinput)
    result = stdout.decode('utf-8').split('\n')
    return result