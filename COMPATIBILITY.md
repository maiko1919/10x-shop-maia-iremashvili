# COMPATIBILITY

ტესტირება ლაივ საიტზე: https://10x-shop-maia-iremashvili.vercel.app/ (9 ნოემბერი, 2026)

## ბრაუზერები და მოწყობილობები

| გვერდი / ფუნქცია | Chrome (desktop) | Edge (desktop) | მობილური 375px (Chrome DevTools) |
|---|---|---|---|
| Catalog: ძებნა, ფილტრები, პაგინაცია | ✓ | ✓ | ✓ |
| Hot deals ზოლი, კატეგორიების მენიუ | ✓ | ✓ | ✓ (sidebar დამალულია, ზედა ზოლი სქროლავს) |
| Quick View | ✓ (გასწორების შემდეგ, იხ. ქვემოთ) | ✓ | ✓ |
| Product: გალერეა, Reviews, Similar | ✓ | ✓ | ✓ |
| Cart: რაოდენობა, Promo 10X10, მიწოდება | ✓ | ✓ | ✓ (გასწორების შემდეგ, იხ. DEBUG-LOG #2) |
| Login → Checkout → შეკვეთა | ✓ | ✓ | ✓ |
| Orders, Profile, Premium | ✓ | ✓ | ✓ |
| Dark mode | ✓ | ✓ | ✓ |
| გვერდის განახლება (F5) ნებისმიერ მისამართზე | ✓ | ✓ | ✓ |

## ნაპოვნი პრობლემები და გასწორება

| პრობლემა | სად | გასწორება |
|---|---|---|
| კალათის ხაზი ეკრანიდან გადადიოდა | მობილური 375px | `flex-wrap` + `min-w-0` (DEBUG-LOG #2) |
| რაოდენობის ღილაკები 36px იყო | მობილური | 44px-მდე გაზრდა (DEBUG-LOG #3) |
| Quick View ღილაკი არ ჩანდა | desktop (Chrome, Edge) | ღილაკი ყოველთვის ჩანს (DEBUG-LOG #7) |

## შენიშვნა

- Safari და Firefox-ზე ტესტირება ვერ მოვახერხე (არ მაქვს დაყენებული / Mac არ მაქვს).
- მობილური შემოწმებულია Chrome DevTools-ის Device Toolbar-ით (iPhone SE, 375px).
- Lighthouse (Mobile): Performance 100, Accessibility 96, Best Practices 100, SEO 92.
