# 10X Shop — სამუშაო გეგმა

## 1. მიზანი

ონლაინ მაღაზია (SPA) React + TypeScript + Tailwind CSS v4-ზე, DummyJSON API-ის პროდუქტებით.
მომხმარებელს შეუძლია: დაათვალიეროს კატალოგი, ნახოს პროდუქტი, დაამატოს კალათაში, შევიდეს სისტემაში და გააფორმოს შეკვეთა.

დიზაინი: ღია, სუფთა სტილი მწვანე აქცენტით.

## 2. Scope

### CORE (სავალდებულო — ჯერ ეს)

| მოდული | რას ვაკეთებ |
|---|---|
| React | კომპონენტები, props/children, useState/useEffect, map/key, Router, AuthContext, CartContext, controlled ფორმები (Login, Checkout) |
| TypeScript | strict რეჟიმი, ტიპები: Product, ProductsResponse, CartItem, CartState, AuthUser, ShippingInfo; typecheck = 0 შეცდომა |
| Tailwind | v4, flex/grid, responsive (375px და desktop), hover/focus/disabled |
| ოპტიმიზაცია | Error Boundary, loading/error/empty მდგომარეობები, DEBUG-LOG |
| პროექტი | PLAN.md, README.md (EN), REPORT.md, Git ისტორია, deploy Vercel-ზე |

### FULL (თუ დრო დარჩა)

- ძებნა, კატეგორიის ფილტრი, სორტი, პაგინაცია
- Top rated / New arrivals / Sale სექციები
- Quick View (პროდუქტის მოკლე ხედი ბარათიდან)
- Reviews და Related products პროდუქტის გვერდზე
- Promo კოდი, dark mode, @theme ფერები

### BONUS (იდეები, თუ ყველაფერი მზადაა)

- Premium სექცია მუქ სტილში
- ფილტრი ბრენდებით
- „You may also like“ ბლოკი

## 3. ამოცანები (WBS)

| Epic | ამოცანა | საათი | დღე |
|---|---|---|---|
| Setup | Vite + React + TS + Tailwind, strict, scripts, GitHub | 1 | 7 ნოე |
| Docs | PLAN.md | 0.5 | 7 ნოე |
| Setup | ტიპები, Layout, Header, Footer, Router, 404 | 2 | 8 ნოე |
| Catalog | პროდუქტების ჩატვირთვა, ProductCard, ProductGrid, loading/error | 2 | 8 ნოე |
| Product | პროდუქტის გვერდი, ფოტოები, მარაგი, Add to cart | 1.5 | 8 ნოე |
| Cart | CartContext, კალათის გვერდი, რაოდენობა, წაშლა, ჯამი | 2 | 9 ნოე |
| Auth | AuthContext, Login ფორმა, Checkout-ზე redirect | 1.5 | 9 ნოე |
| Checkout | ფორმა ვალიდაციით, დადასტურება, კალათის გასუფთავება | 1.5 | 9 ნოე |
| Quality | Error Boundary, responsive შემოწმება, DEBUG-LOG | 1.5 | 10 ნოე |
| Deploy | Vercel, route refresh შემოწმება | 0.5 | 10 ნოე |
| FULL | ძებნა/ფილტრი/სორტი, სექციები, Quick View, Reviews | 3 | 10 ნოე |
| Docs | README.md, REPORT.md, პრეზენტაცია | 2 | 11 ნოე |

## 4. რისკები

| რისკი | რას ვაკეთებ |
|---|---|
| DummyJSON დროებით არ მუშაობს | შეცდომის ტექსტი + Retry ღილაკი, აპლიკაცია არ ითიშება |
| დრო არ მყოფნის | ჯერ მთლიანად CORE, FULL მხოლოდ ამის შემდეგ |
| გვერდის refresh Vercel-ზე 404-ს აგდებს | vercel.json rewrite წესით ყველა მისამართი index.html-ზე |
| TypeScript-ის შეცდომები ბოლოს გროვდება | `npm run typecheck` ყოველი commit-ის წინ |

## 5. Definition of Done

ამოცანა დასრულებულია, როცა:

- ბრაუზერში მუშაობს და კონსოლში შეცდომა არ არის
- `npm run typecheck` და `npm run build` შეცდომის გარეშე სრულდება
- კარგად ჩანს მობილურზეც (375px) და desktop-ზეც
- commit გაკეთებულია და GitHub-ზე ატვირთულია
