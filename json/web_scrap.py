import requests, threading
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
from lxml import html, etree
# r = requests.get('https://southdownsleisure.legendonlineservices.co.uk/enterprise/account/login', auth=('sivashankaryadav@outlook.com', 'Password317'))
#
# print(r.status_code)
#
# #https://southdownsleisure.legendonlineservices.co.uk/enterprise/ticketing/browse?StartDate=2021-10-22&ActivityId=42&LocationId=1932&ResourceId=304
# r = requests.get('https://southdownsleisure.legendonlineservices.co.uk/enterprise/ticketing/browse?StartDate=2021-10-22&ActivityId=42&LocationId=1932&ResourceId=304')
#
# print(r.status_code)
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","DNT": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"}
kural = {}

def my_thread(k_no):
    global kural
    t_list = []
    t_dict = {}
    get_url = r"https://www.ytamizh.com/thirukural/kural-{}/".format(k_no)
    r = requests.get(get_url, headers=headers)
    # print(get_url) #/html/body/div/div[3]/div/div[4]/div[1]/p[2]/text()-//*[@id="incontent"]/div[4]/div[1]/p[2]/text()
    # soup = BeautifulSoup(r.content, 'html.parser')
    # print(soup)
    tree = html.fromstring(r.content)
    # print(tree.xpath('//*[@id="incontent"]/div[4]/div[1]/p[2]/text()'))
    t_dict['பால்'] = tree.xpath('//*[@id="incontent"]/div[2]/span/a')[0].text
    chap = tree.xpath('//*[@id="incontent"]/div[3]/span/a')  # //*[@id="incontent"]/div[3]/span/a
    chap = chap[0].text
    t_dict['Chapter'] = chap.split('/')[1]
    t_dict['அதிகாரம்'] = chap.split('/')[0]
    t_dict['tl1'] = tree.xpath('//*[@id="incontent"]/div[4]/div[1]/p[1]/text()[1]')[0]
    t_dict['tl2'] = tree.xpath('//*[@id="incontent"]/div[4]/div[1]/p[1]/text()[2]')[0]
    t_dict['மு.வரதராசன்'] = tree.xpath('//*[@id="incontent"]/div[4]/div[1]/p[2]/text()')[0]
    t_dict['சிவயோகி சிவக்குமார்'] = tree.xpath('//*[@id="incontent"]/div[4]/div[1]/p[4]/text()')[0]
    t_list.append(t_dict)
    kural[str(i)] = t_list
number_of_chunks = 10
chunk_size = 1330
executor = ThreadPoolExecutor(max_workers=number_of_chunks)
futures = []
for i in tqdm(range(number_of_chunks)):
    chunk = ids[i * chunk_size:(i + 1) * chunk_size]
    futures.append(executor.submit(download_emails, chunk))

#     time.sleep(3)
# with open('my_kural.json', 'w') as fp:
#     json.dump(kural, fp)
print(kural)




