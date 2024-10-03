import csv

used_IDs = []

def make_used_IDs(filename):
    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)

        for row in csvreader:
            if (row[0] != '' and row[0] != 'ID' and row[1] == '-'):
                used_IDs.append(int(row[0]))

def assign(filename):
    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)

        for row in csvreader:
            string = str(row[0])

            if string == '':
                count = 0
                finished = 0
                while finished == 0:
                    count += 1
                    if count not in used_IDs:
                        finished = 1
                used_IDs.append(count)
                string = int(count)

            with open('misc-helpers/sheetoutput.txt', 'a', encoding="utf-8") as f:
                f.write(str(string))
                f.write('\n')

def main():
    make_used_IDs('misc-helpers/sheet200.csv')
    used_IDs.sort()
    # print(used_IDs)
    assign('misc-helpers/sheet200.csv')

if __name__ == "__main__":
    main()