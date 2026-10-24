from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="tarefas_db"
    )
    
@app.route("/")
def index():
    conexao = conectar()
    cursor - conexao.cursor()
    cursor.execute("SELECT id, nome, email FROM usuarios")
    usuarios = cursor.fetchall()
    cursor.close()
    conexao.close()
    return render_template("index.html", usuarios=usuarios)