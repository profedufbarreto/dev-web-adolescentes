def par_ou_impar(numero):
    if numero % 2 == 0:
        return "Par"
    else:
        return "Ímpar"
    
numero = int(input("Digite um número: "))
print(f"{numero} é {par_ou_impar(numero)}")