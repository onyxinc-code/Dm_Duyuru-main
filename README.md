# Wase DM Duyuru Botu

Bu kopya, yerel kullanim ve kurulum kolayligi icin Wase tarafindan duzenlenmistir.

Kurulum ve duzenleme:
- Wase
- Discord: `orjinal_wase`

## Ne ise yarar?

Bu bot, sunucudaki uyelere toplu DM duyurusu gondermek icin kullanilir.

Komutlar:
- `+help` Komut listesini gosterir.
- `+dm <mesaj>` Sunucudaki bot olmayan tum uyelere duyuru gonderir.
- `+odm <mesaj>` Sadece aktif/online uyelere duyuru gonderir.
- `+ping` Bot gecikmesini gosterir.

## Nasil calisir?

1. `config.json` icine bot tokenini, prefix bilgisini ve durum yazi ayarlarini girersin.
2. `kurulum.bat` ile gerekli paketleri kurarsin.
3. `baslat.bat` ile botu baslatirsin.
4. Bot acildiginda durum yazilari doner ve komutlari dinlemeye baslar.

## Kurulum

1. Bilgisayarinda Node.js 16 veya ustu bir surum kurulu olsun.
2. `config.json` dosyasini doldur:
   - `token`: Bot tokenin
   - `prefix`: Komut on eki
   - `owners`: Kendi Discord kullanici ID degerlerin
   - `statuses`: Bot durumunda donecek yazilar
   - `timers`: Durum degisim suresi (saniye)
3. `kurulum.bat` dosyasini calistir.
4. Ardindan `baslat.bat` dosyasini calistir.

Alternatif olarak terminalden su komutlari da kullanabilirsin:

```bash
npm install
npm start
```

## Lisans ve atif

Bu proje orijinal lisans kosullarina tabidir. Orijinal kaynak ve lisans korunmustur.

- Orijinal atif: orjinal_wase
- Lisans dosyasi: [LICENSE](./LICENSE)
