# dotInstrukcije

figma: https://www.figma.com/file/H7MiCGddxAWLAusmMXpeDq/dotInstrukcije?type=design&mode=design&t=yN0IyoeuWHCsdUJk-0
kontakt: dotget@eestec.hr ili pavleergovic@gmail.com

Dobrodošli na programski zadatak za radionicu .GET

Prije svega, forkajte ovaj repo te nadodajte svoje ime i prezime u nazivu projekta.
Vrlo je moguće da ćemo još raditi na ovome, tako da molim da pratite WhatsUp grupu gdje ćemo Vas obavijestiti da syncate repo.

# Instalacija

za ovaj projekt potreban vam je VSC i nmp.
Napravite 
```
git clone
```
svog forkanog repoa te napravite 
```
cd ime-projekta
npm install
npm run dev
```
Preimenujte .env.example u .env te dodajte svoj link na Backend.

Vaš kod je spreman!

# Upute

Motivacija iza projekta je da naučite backend u .NET-u i spajanje frontenda na backend aplikacije.
Frontend je spreman te on poziva rute, Vaš posao je da dovršite te rute kako bi front proradio.
U prvoj fazi projekta, ne bi trebali ništa pisati na frontu jer je sve spremno.

Aplikacija je apk za instrukcije koja spaja studente i profesore te im nudi opciju dogovaranja termina instrukcija.

# Entiteti

## Student
  -id: id
  -email: String
  -name: String
  -surname: String
  -password: String 
  -profilePictureUrl: String

## Professor
  -email: String
  -name: String
  -surname: String
  -password: String 
  -profilePictureUrl: String
  -subjects: String[] // lista urlova/id-eva predmeta na kojima profesor predaje

## Subject
  -id: id
  -title: String
  -url: String
  -description: String

## Instructions Date
  -studentId: id
  -professorId: id
  -dateTime: DateTime
  -status: String //status može biti poslan zahtjev, nadolazeća instrukcija ili prošla instukcija



