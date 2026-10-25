import musql.connector

class Database:
    """Classe que encapsula todas as operações do banco de dados MySQL"""
    def __init__(self, host="localhost", user="root", password="root", database="tarefas_db"):
        self.config = {
            "host": host,
            "user": user,
            "password": password,
        }
        self.database = database
        self.criar_banco()
        self.criar_tabela()
        
    def conectar(self):
        conexao = mysql.connector.connect(
            **self.config,
            database=self.database
        )
        return conexao
    
    def criar_banco(self):
        conexao = mysql.connector.connect(**self.config)
        cursor = conexao.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {self.database}")
        cursor.close()
        conexao.close()
        
    def criar_tabela(self):
        conexao = self.conectar()
        cursor = conexao.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tarefas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(200) NOT NULL,
                descricao TEXT,
                concluida TINYINT DEFAULT 0,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
        conexao.commit()
        cursor.close()
        conexao.close()
        
    def listar_todas(self):
        conexao = self.conectar()
        cursor - conexao.cursor(dictionary=True)
        cursor.execute('SELECT * FROM tarefas ORDER BY data_criacao DESC')
        tarefas = cursor.fetchall()
        cursor.close()
        return tarefas
    
    