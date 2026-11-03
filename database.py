import sqlite3

conexao = sqlite3.connect("filmes.db")
cursor = conexao.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS filmes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        genero TEXT NOT NULL,
        nota INTEGER,
        ano INTEGER
    )               
""")
conexao.commit()

while True:
    print("\n--- Cadastro de filmes ---")
    titulo = input("Título de filme (ou 'sair' para parar): ")
    
    if titulo.lower() == "sair":
        break
    
    genero = input("Gênero: ")
    nota = int(input("Nota de 0 a 10: "))
    ano = int(input("Ano de lançamento: "))
    
    cursor.execute(
        "INSERT INTO filmes (titulo, genero, nota, ano) VALUES(?, ?, ?, ?)",
        (titulo, genero, nota, ano)
    )
    conexao.commit()
    print(f"Filme '{titulo}' salvo")
    
print("\n--- Filmes cadastrados ---")
filmes = cursor.execute("SELECT * FROM filmes").fetchall()

for filme in filmes:
    print(f"ID: {filme[0]} | {filme[1]} | {filme[2]} | Nota: {filme[3]} | Ano: {filme[4]}")
    
conexao.close()