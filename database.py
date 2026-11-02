import sqlite3

conexao = sqlite3.connect("cadastro.db")
cursor = conexao.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS alunos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        idade INTEGER,
        cor_favorita TEXT
    )
""")

conexao.commit()
conexao.close()
print("Banco criado com sucesso!")