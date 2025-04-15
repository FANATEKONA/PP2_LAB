import csv

data = [
    ["Иван", "+71234567890"],
    ["Мария", "+79876543210"],
    ["Пётр", "+75551234567"]
]

with open("phonebook.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

print("CSV файл 'phonebook.csv' создан!")
