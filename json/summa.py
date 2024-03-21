import json
# kural = {}
# t_list = []
# i = 0
# with open('summa.txt', encoding="utf8") as f:
#     data_io = f.read()
#     print(type(data_io))
#     ddata = data_io.split('[')
#     print(len(ddata))
#     for dd in ddata:
#         try:
#             # print(dd.split(']')[0])
#             t_list.append(dd.split(']')[0])
#             kural[str(i)] = t_list
#             t_list = []
#             i += 1
#         except:
#             continue
# print(kural)
# with open('my_kural1.json', 'w', encoding="utf8") as fp:
#     json.dump(kural, fp, ensure_ascii=False)
with open('edit_001.json', 'r', encoding="utf8") as fp:
    data = json.load(fp)
for k in data:
    print(data[k])
