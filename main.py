def maior_da_lista(valores):
    maior = valores[0]
    i = 1
    while i < len(valores):
        if valores[i] > maior:
            maior = valores[i]
        i += 1
    return maior

numeros = []
for i in range(5):
    numeros.append(int(input(f"Número {i + 1}: ")))

print(f"Maior: {maior_da_lista(numeros)}")