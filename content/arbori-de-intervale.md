În competițiile de informatică și olimpiadă se întâlnesc adesea probleme care implică operarea pe subsecvențele unui vector. Spre exemplu, cum putem calcula eficient suma, maximul sau minimul pe o subsecvență a unui vector, mai ales când acesta suferă **modificări în timp real**?

!!! note "Observație" Dacă vectorul este static (nu suferă modificări), putem utiliza tehnici simple precum vectori de [sume parțiale](https://roalgo-discord.github.io/arhiva-educationala/usor/partial-sums/) sau RMQ. Totuși, în scenariile unde vectorul se modifică frecvent, aceste tehnici devin ineficiente. Operațiile de query au o complexitate de $O(1)$ atât pentru sume parțiale, cât și pentru RMQ. Însă, pentru actualizări, trebuie reconstruit tot tabelul de valori, ceea ce duce la o complexitate de $O(n)$ pentru sume parțiale și $O(n \log n)$ pentru RMQ.

**Arborii de intervale** (cunoscuți și sub denumirea de segment trees sau aint în jargonul românesc) reprezintă o soluție elegantă și eficientă pentru acest tip de probleme, permițând efectuarea rapidă de interogări și actualizări în $O(log n)$ pentru ambele operații.

În acest articol, vom explora conceptele de bază ale arborilor de intervale, modul de construire și utilizare a acestora, și vom analiza câteva aplicații frecvente în problemele de olimpiadă. Vom începe prin a defini structura unui arbore de intervale și vom continua prin a explica operațiile de actualizare, interogare și implementările acestora. În final, vom discuta și câteva probleme apărute în concursurile de programare competitivă. Fără prea multă vorbărie, să începem!

## Problema clasică

Fie un vector $A$ cu $N$ elemente. Asupra lui se vor face $M$ operații de tipul:

- `update(pos, val)` - actualizează valoarea de pe poziția `pos` în `val` 
- `query(x, y)` - aflați suma elementelor din intervalul $[x, y]$, $(A_{st} + A_{st+1} + ... + A_{dr})$

## Structura unui arbore de intervale

Un arbore de intervale este un arbore binar complet care este folosit pentru a stoca informații despre intervalele unui vector. Fiecare nod din arbore reprezintă un interval și stochează o anumită valoare (de exemplu, suma, minimul sau maximul) pentru intervalul respectiv.

### Cum se formează un arbore de intervale?

Să considerăm un vector $A$ de dimensiune $N$. Arborele de intervale asociat acestui vector se construiește astfel:

- Rădăcina arborelui va fi nodul $1$ și va avea asociat răspunsul pentru intervalul $[1,n]$. 
- Un nod $k$ are asociat un interval $[st,dr]$, iar acesta are doi fii ce se vor afla pe pozițiile $2 \cdot k$ (fiul din stânga) și $2 \cdot k +1$ (fiul din dreapta). Fiul din stânga va avea răspunsul pentru intervalul $[st, m]$, iar fiul din dreapta pentru $[m+1, dr]$, unde m este mijlocul intervalului.

Să considerăm vectorul $A=[5,8,6,3,2,7,2,6]$, arborele de intervale asociat vectorului $A$ va arăta în felul următor:

![aint.svg](https://cdn.sanity.io/images/7svjwvsp/production/a597ed30ac5a910795d8101b6f89f4323fd302d8-940x354.svg?rect=205,0,531,354&w=600&h=400&fit=fillmax)

### Care este memoria necesara stocarii ?

- Numărul de frunze: Arborele de intervale are N frunze, câte una pentru fiecare element din vectorul original. Aceste frunze sunt reprezentate în ultimul nivel al arborelui. 
- Numărul de noduri interne: avem $N-1$ noduri interne. - Înălțimea maximă a unui arbore binar complet cu $N$ frunze este $\lceil \log_2(N) \rceil$.

Astfel, în caz general, numărul total de noduri (frunze + noduri interne) dintr-un arbore binar complet de înălțime $h$ este:

$$ \begin{aligned} 2^{h+1} - 1 &= 2 \cdot 2^{\lceil \log_2(N) \rceil} - 1 \\[0.2cm] &\leq 2 \cdot 2^{\log_2(N) + 1} - 1 \\[0.2cm] &\leq 4 \cdot 2^{\log_2(N)} - 1 \\[0.2cm] &= 4 \cdot N - 1 \end{aligned} $$

!!! note "Observație" Dimensiunea $4 \cdot N$ asigură faptul că avem suficient spațiu pentru a construi un arbore de intervale complet, indiferent de dimensiunea vectorului original. Această alocare permite menținerea unui arbore echilibrat și eficient, permițând efectuarea de operații de actualizare și interogare într-un mod optim.

## Operații elementare

### Construirea arborelui

Construirea unui arbore de intervale se realizează într-un mod recursiv bottom-up, pornind de la frunzele arborelui (care corespund elementelor vectorului inițial) și mergând spre rădăcină. La fiecare nivel al arborelui, valorile nodurilor se determină pe baza fiilor săi.

Această operație se efectuează în $O(n)$, unde $n$ este numărul de elemente din vectorul inițial. De reținut că există și o altă variantă de a construi arborele prin a actualiza fiecare poziție cu valoarea din vector, însă duce la o complexitate de $O(n \log n)$.

![build.svg](https://cdn.sanity.io/images/7svjwvsp/production/ae0b578ff4ada8844074d1deb0571495abf25ef0-940x274.svg?rect=265,0,411,274&w=600&h=400&fit=fillmax)

În diagramele de mai sus, vedem că la fiecare pas, valorile din noduri sunt calculate pe baza sumelor subintervalelor din fiul stâng și fiul drept. Acest proces este realizat în codul de mai jos prin apeluri recursive, unde funcția `build` este apelată pentru fiecare subarbore (stâng și drept), iar valorile din noduri sunt apoi actualizate.

!!! info "De reținut" Arborii de intervale funcționează eficient doar cu **operații asociative** (ex: suma, maximul, minimul, cmmdc). Asociativitatea permite combinarea rezultatelor din subintervale fără a afecta corectitudinea rezultatului final.

Iată un exemplu de implementare a acestei operații în C++:

```cpp
void build(int node, int st, int dr) {
  if (st == dr) {
    aint[node] = A[st];
    return;
  }
  int mid = (st + dr) / 2;
  build(2 * node, st, mid);          // Construim subarborele stang
  build(2 * node + 1, mid + 1, dr);  // Construim subarborele drept

  // Actualizam rezultatul nodului in functie de rezultatele fiilor
  aint[node] = aint[2 * node] + aint[2 * node + 1];
}
```

### Operația de update

Pentru a efectua un update, ne vom deplasa în arbore până la frunza care reprezintă elementul modificat. Odată ce am ajuns la frunză, înlocuim valoarea veche cu cea nouă. Pe măsură ce revenim din recursivitate, actualizăm fiecare nod din drum, recalculând valorile pe baza celor doi fii, pentru a ne asigura că arborele rămâne corect.

Această operație se efectuează în $O(\log n)$, unde $n$ este numărul de elemente din vectorul inițial. Complexitatea este determinată de înălțimea arborelui, deoarece actualizarea trebuie propagată de la frunză până la rădăcină.

Mai jos este prezentată o diagramă care ilustrează cum se modifică structura arborelui de intervale după ce actualizăm valoarea elementului de pe poziția $5$ din $2$ în $1$.

![update.svg](https://cdn.sanity.io/images/7svjwvsp/production/b92a6198813184dcf5824b0b6b35f9175eca6113-940x410.svg?rect=163,0,615,410&w=600&h=400&fit=fillmax)

În diagramele de mai sus, putem observa cum se modifică structura arborelui de intervale după ce modificăm valoarea de pe poziția $5$ din $2$ în $7$. Nodurile afectate de această modificare sunt evidențiate, iar valorile lor sunt actualizate pentru a reflecta noua configurație.

Iată un exemplu de implementare a acestei operații în C++:

```cpp
void update(int pos, int val, int node, int st, int dr) {
    if (st == dr) {
        aint[node] = val; // Dacă am ajuns la poziția pos, schimbăm valoarea
        return;
    }

    int mid = (st + dr) / 2;

    if (pos <= mid) // Dacă pos se află în jumătatea stângă
        update(pos, val, node * 2, st, mid);
    else            // Dacă pos se află în jumătatea dreaptă
        update(pos, val, node * 2 + 1, mid + 1, dr);

    // La întoarcerea din apelul recursiv, actualizăm nodul
    aint[node] = aint[node * 2] + aint[node * 2 + 1];
}

```

### Operatia de query

Când dorim să efectuăm o interogare pe un interval $[x, y]$, scopul este de a găsi rapid răspunsul pentru acest subinterval fără a fi nevoie să parcurgem toți termenii din vectorul inițial. Arborele de intervale face acest lucru prin împărțirea intervalului $[x, y]$ în subintervale mai mici, pe care le combină pentru a găsi răspunsul final.

Această descompunere se bazează pe faptul că, pentru orice interval $[st, dr]$ gestionat de un nod din arbore, avem trei cazuri:

1. **Interval complet în afara intervalului de interogare** (gri închis): Dacă intervalul $[st, dr]$ nu se suprapune cu intervalul $[x, y]$, atunci acel interval nu contribuie la răspuns și putem returna direct 0 sau altă valoare de identitate (pentru maxim, minim etc.).
2. **Interval complet inclus în intervalul de interogare** (portocaliu): Dacă intervalul $[st, dr]$ este complet inclus în intervalul $[x, y]$, returnăm valoarea stocată în nodul respectiv, deoarece aceasta reprezintă deja răspunsul pentru întregul interval.
3) **Interval parțial suprapus** (galben): În acest caz, descompunem intervalul în două subintervale, corespunzătoare fiilor nodului curent, și combinăm rezultatele interogărilor pentru aceste subintervale.

![query.svg](https://cdn.sanity.io/images/7svjwvsp/production/34c9b58ffa76e96063d87c6a50f97fa0bdc66dba-940x410.svg?rect=163,0,615,410&w=600&h=400&fit=fillmax)

Iată un exemplu de implementare a operației de query în C++:

```cpp
int query(int x, int y, int node, int st, int dr) {
    if (dr < x || y < st) // Dacă intervalul se află complet în afara
        return 0;

    if (x <= st && dr <= y) // Dacă intervalul este complet inclus
        return aint[node];

    int mid = (st + dr) / 2;
    int Q_st = query(x, y, node * 2, st, mid);
    int Q_dr = query(x, y, node * 2 + 1, mid + 1, dr);

    return Q_st + Q_dr;
}

```

## Probleme rezolvate

!!! info "Tip" Înainte de a trece la problemele rezolvate, te încurajez să încerci să **implementezi** structura de date și **să rezolvi singur** câteva probleme de bază. Încearcă să implementezi arborele de intervale pentru a calcula suma și maximul pe un interval dat. În modul acesta vei vedea unde ai neclarități. După ce te-ai convins că ai înțeles tot ce s-a discutat până acum, te invit să discutăm câteva probleme mai interesante. **Un alt mic sfat ar fi să încerci problema înainte de a urmări rezolvarea completă.**

### 1. [Arbint](https://infoarena.ro/problema/arbint)

Fie un vector $A$ cu $N$ elemente naturale. Asupra lui se vor face $M$ operații, codificate astfel în fișierul de intrare:

- `0 a b` - Să se determine maximul din intervalul $[a, b]$.

- `1 a b` - Valoarea elementului de pe poziția $a$ va deveni $b$.

Problema de bază, identică cu cea pe care am rezolvat-o anterior, singura diferență este că acum trebuie să calculăm elementul maxim. Soluția mea o puteți vedea [aici](https://infoarena.ro/job_detail/3239964?action=view-source).

### 2. [Maxq](https://www.infoarena.ro/problema/maxq)

Johnie a început să se joace cu un vector de numere. El dispune inițial de un vector $V$ cu $N$ numere întregi și poate efectua următoarele operații:

- Schimbarea elementului de pe poziția $p cu un alt număr întreg;
- Aflarea subsecvenței de sumă maximă din $V$ inclusă între indicii $a$ și $b$.

Pentru rezolvarea acestei probleme vom adopta aceeași strategie, vom analiza modul în care putem combina două segmente de lungime $L/2$ într-un singur segment de lungime $L$. În cazul acestei probleme vom avea nevoie de mai multe informații pentru fiecare nod:

```cpp
struct Node {
    int suma;      // Suma subsecvenței
    int prefmax;   // Prefixul de sumă maximă
    int suffmax;   // Sufixul de sumă maximă
    int smax;      // Subsecvența de sumă maximă
};
```

Să analizam puțin unde se poate află segmentul de sumă maximă după combinarea celor două subsegmente.

- Segmentul de sumă maximă se află în intervalul din stânga (L.smax) - Segmentul de sumă maximă se află în intervalul din dreapta (R.smax) - Segmentul de sumă maximă începe în intervalul stâng și se termină în cel drept. Aceasta este reprezentată prin combinația dintre L.suffmax și R.prefmax.

![maxq_1.svg](https://cdn.sanity.io/images/7svjwvsp/production/a3ac81ccdc76e656214e16b7fe0d636589696876-940x222.svg?rect=304,0,333,222&w=600&h=400&fit=fillmax)

Pentru a calcula prefixul de sumă maximă pentru fiecare nod luăm maximul dintre prefixul găsit în stânga și întregul segment din stânga la care se adaugă prefixul de sumă maximă din dreapta.

![maxq_2.svg](https://cdn.sanity.io/images/7svjwvsp/production/1e82f4cb72ab0bef54d52172cf800353b8daedd0-940x222.svg?rect=304,0,333,222&w=600&h=400&fit=fillmax)

Analog pentru sufixul de sumă maximă, doar că luăm maximul dintre sufixul găsit în dreapta și întregul segment care începe în dreapta și se continua în stânga.

```cpp
struct Node {
    int suma;      // Suma subsecvenței
    int prefmax;   // Prefixul de sumă maximă
    int suffmax;   // Sufixul de sumă maximă
    int smax;      // Subsecvența de sumă maximă
};

Node merge(Node L, Node R) {
    Node T;
    T.suma = L.suma + R.suma;
    T.prefmax = max(L.prefmax, L.suma + R.prefmax);
    T.suffmax = max(R.suffmax, R.suma + L.suffmax);
    T.smax = max(max(L.smax, R.smax), L.suffmax + R.prefmax);
    return T;  // Nu uita să returnezi nodul rezultat
}
```

!!! info "Întrebare" Cu ce valori inițializăm frunzele arborelui ?

Iată o posibila implementare a acestei probleme in C++:

```cpp
#include <algorithm>
#include <fstream>
#include <iostream>
using namespace std;

ifstream fin("maxq.in");
ofstream fout("maxq.out");

const int MAXN = 2e5 + 1;

struct Node {
    long long suma;    // Suma subsecvenței
    long long prefmax; // Prefixul de sumă maximă
    long long sufmax;  // Sufixul de sumă maximă
    long long smax;    // Subsecvența de sumă maximă
} aint[MAXN * 4];

int n;

Node combine(Node L, Node R) {
    Node T;
    T.suma = L.suma + R.suma;
    T.prefmax = max(L.prefmax, L.suma + R.prefmax);
    T.sufmax = max(R.sufmax, R.suma + L.sufmax);
    T.smax = max(max(L.smax, R.smax), L.sufmax + R.prefmax);
    return T;
}

void update(int pos, int val, int node = 1, int st = 1, int dr = n) {
    if (st == dr) {
        if (val > 0)
            aint[node] = {val, val, val, val};
        else
            aint[node] = {val, 0, 0, 0};
        return;
    }

    int mid = (st + dr) / 2;
    if (pos <= mid)
        update(pos, val, node * 2, st, mid);
    else
        update(pos, val, node * 2 + 1, mid + 1, dr);

    aint[node] = combine(aint[node * 2], aint[node * 2 + 1]);
}

Node query(int x, int y, int node = 1, int st = 1, int dr = n) {
    if (y < st || dr < x)
        return {0, 0, 0, 0};

    if (x <= st && dr <= y)
        return aint[node];

    int mid = (st + dr) / 2;
    Node Q1 = query(x, y, node * 2, st, mid);
    Node Q2 = query(x, y, node * 2 + 1, mid + 1, dr);

    return combine(Q1, Q2);
}

int main() {
    int q;
    fin >> n;

    for (int i = 1; i <= n; i++) {
        int x;
        fin >> x;
        update(i, x);
    }

    fin >> q;
    while (q--) {
        int op, x, y;
        fin >> op >> x >> y;

        if (op == 0)
            update(x + 1, y);
        else
            fout << query(x + 1, y + 1).smax << '\n';
    }

    return 0;
}
```

### 3. [NrInversiuni](https://www.pbinfo.ro/probleme/3206/nrinversiuni)

În această problemă, trebuie să determinăm numărul de inversiuni dintr-o permutare dată a unui vector de lungime $n$. O inversiune este o pereche ordonată $(i, j)$ astfel încât $1 \leq i < j \leq n$ și $v[i] > v[j]$.

**Soluția naivă** ar presupune să verificăm pentru fiecare pereche de elemente $(i, j)$ dacă $v[i] > v[j]$. Acest lucru necesită două bucle îmbricate, una pentru $i$ și alta pentru $j$, ceea ce duce la o complexitate de $O(n^2)$.

**Soluția optimă**. Această problemă poate fi rezolvată eficient cu ajutorul arborilor de intervale. Observația esențială este că fiecare element formează inversiuni cu toate elementele mai mari decât el care apar înaintea lui în vector. Pentru a implementa soluția, folosim un arbore de intervale care ne ajută să menținem numărul de elemente mai mare decât un anumit element pe măsură ce parcurgem vectorul.

**Notă:** Folosind această metodă, complexitatea algoritmului se reduce la $O(n \log n)$.

Iată cum se poate implementa soluția:

- Pentru fiecare element $x$, calculăm câte elemente mai mari decât $x$ se află deja în arbore. Altfel spus, câte elemente se află în intervalul $[x+1,n]$. 
- Actualizăm arborele, marcând apariția elementului $x$.

<ResourcesTable header="Bibliografie si resurse suplimentare" 
 resource='[
   {
      "source":"CPPI",
      "title":"Materia Arbori de Intervale",
      "link":"https://cppi.sync.ro/materia/arbori_de_intervale.html",
      "description":"Material de curs cuprinzător despre arbori de intervale.",
      "sourceLink":"https://cppi.sync.ro"
   },
   {
      "source":"USACO Guide",
      "title":"PURS",
      "link":"https://usaco.guide/gold/PURS?lang=cpp",
      "description":"Ghid pentru provocări avansate de programare.",
      "sourceLink":"https://usaco.guide"
   },
   {
      "source":"Codeforces EDU",
      "title":"Lesson 4",
      "link":"https://codeforces.com/edu/course/2/lesson/4",
      "description":"Curs complet pentru introducerea în arbori de intervale.",
      "sourceLink":"https://codeforces.com/edu"
   },
   {
      "source":"CSAcademy",
      "title":"Segment Trees",
      "link":"https://csacademy.com/lesson/segment_trees",
      "description":"Articol care conține animații pentru operațiile elementare.",
      "sourceLink":"https://csacademy.com"
   },
   {
      "source":"CPAlgorithms",
      "title":"Segment Tree",
      "link":"https://cp-algorithms.com/data_structures/segment_tree.html",
      "description":"Articol mai avansat care prezintă mai multe tehnici.",
      "sourceLink":"https://cp-algorithms.com"
   },
   {
      "source":"Codeforces Blog",
      "title":"Efficient and Easy Segment Trees",
      "link":"https://codeforces.com/blog/entry/18051",
      "description":"Postare pe blog despre arbori de intervale eficienți.",
      "sourceLink":"https://codeforces.com"
   },
   {
      "source":"Infoarena",
      "title":"Arbori de Intervale si Baleiere",
      "link":"https://www.infoarena.ro/arbori-de-intervale",
      "description":"Introducere în arborii de intervale cu exemple.",
      "sourceLink":"https://www.infoarena.ro"
   },
   {
      "source":"GitHub",
      "title":"Template Arbori de Intervale",
      "link":"https://github.com/alextm0/Data-Structures-Algorithms/blob/main/Segment%20Tree/aint.cpp",
      "description":"Clasă flexibilă pentru modificarea rapidă a operațiilor.",
      "sourceLink":"https://github.com/alextm0"
   }
]' />

<ProblemSetTable problemSetName="Probleme antrenament" 
    problemSet='[
    {
        "solutionSlug":"dynamic-range-minimum-queries",
        "source":"CSES",
        "name":"Dynamic Range Minimum Queries",
        "link":"https://cses.fi/problemset/task/1649",
        "sourceLink":"https://cses.fi",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"number-of-minimums-on-a-segment",
        "source":"Codeforces",
        "name":"Number of Minimums on a Segment",
        "link":"https://codeforces.com/edu/course/2/lesson/4/1/practice/contest/273169/problem/C",
        "sourceLink":"https://codeforces.com",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"intervalxy",
        "source":"PbInfo",
        "name":"Intervalxy",
        "link":"https://www.pbinfo.ro/probleme/1591/intervalxy",
        "sourceLink":"https://www.pbinfo.ro",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"kth-one",
        "source":"Codeforces",
        "name":"Kth one",
        "link":"https://codeforces.com/edu/course/2/lesson/4/2/practice/contest/273278/problem/B",
        "sourceLink":"https://codeforces.com",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"first-element-at-least-x",
        "source":"Codeforces",
        "name":"First element at least X",
        "link":"https://codeforces.com/edu/course/2/lesson/4/2/practice/contest/273278/problem/C",
        "sourceLink":"https://codeforces.com",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"sign-alternation",
        "source":"Codeforces",
        "name":"Sign Alternation",
        "link":"https://codeforces.com/edu/course/2/lesson/4/4/practice/contest/274684/problem/A",
        "sourceLink":"https://codeforces.com",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"inversions",
        "source":"Codeforces",
        "name":"Inversions",
        "link":"https://codeforces.com/edu/course/2/lesson/4/4/practice/contest/274684/problem/C",
        "sourceLink":"https://codeforces.com",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"xenia-and-bit-operations",
        "source":"Codeforces",
        "name":"Xenia and bit operations",
        "link":"https://codeforces.com/contest/339/problem/D",
        "sourceLink":"https://codeforces.com",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"irrigation",
        "source":"Codeforces",
        "name":"Irrigation",
        "link":"https://codeforces.com/contest/1181/problem/D",
        "sourceLink":"https://codeforces.com",
        "badge":"easy",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"distinct-value-queries",
        "source":"CSES",
        "name":"Distinct Value Queries",
        "link":"https://cses.fi/problemset/task/1734",
        "sourceLink":"https://cses.fi",
        "badge":"normal",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"united-cows-of-farmer-john-usaco-gold",
        "source":"USACO",
        "name":"United Cows of Farmer John - USACO Gold",
        "link":"https://usaco.org/index.php?page=viewproblem2&cpid=1137",
        "sourceLink":"https://usaco.org",
        "badge":"normal",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"increasing-subsequence-ii",
        "source":"CSES",
        "name":"Increasing Subsequence II",
        "link":"https://cses.fi/problemset/task/1748",
        "sourceLink":"https://cses.fi",
        "badge":"normal",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"salary-queries",
        "source":"CSES",
        "name":"Salary Queries",
        "link":"https://cses.fi/problemset/task/1144",
        "sourceLink":"https://cses.fi",
        "badge":"normal",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"kth-oni-2023",
        "source":"Kilonova",
        "name":"Kth - ONI 2023",
        "link":"https://kilonova.ro/problems/542/",
        "sourceLink":"https://kilonova.ro",
        "badge":"normal",
        "tags":"Segment Tree"
    },
    {
        "solutionSlug":"intersectie-segmente",
        "source":"PbInfo",
        "name":"Intersecție segmente",
        "link":"https://www.pbinfo.ro/probleme/2103/intersectie-segmente",
        "sourceLink":"https://www.pbinfo.ro",
        "badge":"normal",
        "tags":"Segment Tree"
    }
]' />
