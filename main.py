def somar_ate(n):
    soma = 0
    for i in range(1, n + 1):
        soma += i
    return soma

n = int(input("Digite um número: "))
print(f"Soma de 1 até {n} = {somar_ate(n)}")