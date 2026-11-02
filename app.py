from flask import Flask, request, redirect, render_template
import sqlite3

app = Flask(__name__)

def conectar():
    conexao = sqlite3.connect("cadastro.db")
    conexao.row_factory = sqlite3.Row
    return conexao

@app.route("/")
def index():
    conexao = conectar()
    alunos = conexao.execute("SELECT * FROM alunos").fetchall()
    conexao.close()
    return render_template("index.html", alunos=alunos)

@app.route("/cadastrar", methods=["POST"])
def cadastrar():
    nome = request.form["nome"]
    email = request.form["email"]
    idade = request.form["idade"]
    cor = request.form["cor"]
    
    conexao = conectar()
    conexao.execute(
        "INSERT INTO alunos (nome, email, idade, cor_favorita) VALUES (?, ?, ?, ?)",
        (nome, email, idade, cor)
    )
    conexao.commit()
    conexao.close()
    
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)