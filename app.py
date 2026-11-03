from flask import Flask, request, redirect, render_template
import sqlite3

app = Flask(__name__)

def conectar():
    conexao = sqlite3.connect("filmes.db")
    conexao.row_factory = sqlite3.Row
    return conexao

@app.route("/")
def index():
    conexao = conectar()
    filmes = conexao.execute("SELECT * FROM filmes").fetchall()
    conexao.close()
    return render_template("index.html", filmes=filmes)

@app.route("/cadastrar", methods=["POST"])
def cadastrar():
    titulo = request.form["titulo"]
    genero = request.form["genero"]
    nota = request.form["nota"]
    ano = request.form["ano"]
    assistido = request.form.get("assisto", "Não")
    
    conexao = conectar()
    conexao.execute(
        "INSERT INTO filmes (titulo, genero, nota, ano, assistido) VALUES(?, ?, ?, ?, ?)",
        (titulo, genero, nota, ano, assistido)
    )
    conexao.commit()
    conexao.close()
    
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
    