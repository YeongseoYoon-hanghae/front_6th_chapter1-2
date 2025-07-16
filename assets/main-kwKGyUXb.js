var Ce = Object.defineProperty;
var ie = (e) => {
  throw TypeError(e);
};
var Te = (e, t, a) =>
  t in e
    ? Ce(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
    : (e[t] = a);
var j = (e, t, a) => Te(e, typeof t != "symbol" ? t + "" : t, a),
  z = (e, t, a) => t.has(e) || ie("Cannot " + a);
var x = (e, t, a) => (
    z(e, t, "read from private field"),
    a ? a.call(e) : t.get(e)
  ),
  L = (e, t, a) =>
    t.has(e)
      ? ie("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, a),
  O = (e, t, a, s) => (
    z(e, t, "write to private field"),
    s ? s.call(e, a) : t.set(e, a),
    a
  ),
  $ = (e, t, a) => (z(e, t, "access private method"), a);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const n of o)
      if (n.type === "childList")
        for (const c of n.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && s(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(o) {
    const n = {};
    return (
      o.integrity && (n.integrity = o.integrity),
      o.referrerPolicy && (n.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (n.credentials = "omit")
          : (n.credentials = "same-origin"),
      n
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const n = a(o);
    fetch(o.href, n);
  }
})();
const Ae = "modulepreload",
  Oe = function (e) {
    return "/front_6th_chapter1-2/" + e;
  },
  de = {},
  _e = function (t, a, s) {
    let o = Promise.resolve();
    if (a && a.length > 0) {
      document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]"),
        d =
          (c == null ? void 0 : c.nonce) ||
          (c == null ? void 0 : c.getAttribute("nonce"));
      o = Promise.allSettled(
        a.map((i) => {
          if (((i = Oe(i)), i in de)) return;
          de[i] = !0;
          const l = i.endsWith(".css"),
            m = l ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${i}"]${m}`)) return;
          const f = document.createElement("link");
          if (
            ((f.rel = l ? "stylesheet" : Ae),
            l || (f.as = "script"),
            (f.crossOrigin = ""),
            (f.href = i),
            d && f.setAttribute("nonce", d),
            document.head.appendChild(f),
            l)
          )
            return new Promise((A, V) => {
              (f.addEventListener("load", A),
                f.addEventListener("error", () =>
                  V(new Error(`Unable to preload CSS for ${i}`))
                ));
            });
        })
      );
    }
    function n(c) {
      const d = new Event("vite:preloadError", { cancelable: !0 });
      if (((d.payload = c), window.dispatchEvent(d), !d.defaultPrevented))
        throw c;
    }
    return o.then((c) => {
      for (const d of c || []) d.status === "rejected" && n(d.reason);
      return t().catch(n);
    });
  },
  U = new WeakMap(),
  J = new Set();
let q = null;
function Le(e) {
  ((q = e),
    J.forEach((t) => {
      (e.removeEventListener(t, W), e.addEventListener(t, W));
    }));
}
function W(e) {
  let t = e.target;
  for (; t && t !== q; ) {
    const a = U.get(t);
    if (a) {
      const s = a.get(e.type);
      if (s) {
        s.forEach((o) => o(e));
        return;
      }
    }
    t = t.parentElement;
  }
}
function he(e, t, a) {
  U.has(e) || U.set(e, new Map());
  const s = U.get(e);
  (s.has(t) || s.set(t, new Set()),
    s.get(t).add(a),
    J.has(t) ||
      (J.add(t), q && (q.removeEventListener(t, W), q.addEventListener(t, W))));
}
function Re(e, t, a) {
  const s = U.get(e);
  if (!s) return;
  const o = s.get(t);
  o && o.delete(a);
}
function k(e) {
  if (e == null || typeof e == "boolean") return document.createTextNode("");
  if (typeof e == "string" || typeof e == "number")
    return document.createTextNode(e);
  if (Array.isArray(e)) {
    const a = document.createDocumentFragment();
    return (e.forEach((s) => a.appendChild(k(s))), a);
  }
  const t = document.createElement(e.type);
  return (ke(t, e.props ?? {}), t.append(...e.children.map(k)), t);
}
function ke(e, t) {
  Object.entries(t).forEach(([a, s]) => {
    if (a.startsWith("on") && typeof s == "function") {
      const o = a.toLowerCase().slice(2);
      he(e, o, s);
    } else
      ["checked", "disabled", "selected", "readOnly"].includes(a)
        ? (e[a] = !!s)
        : a === "className"
          ? s
            ? e.setAttribute("class", s)
            : e.removeAttribute("class")
          : a === "style" && typeof s == "object"
            ? Object.assign(e.style, s)
            : e.setAttribute(a, s);
  });
}
const fe = () => {
    const e = new Set();
    return { subscribe: (s) => e.add(s), notify: () => e.forEach((s) => s()) };
  },
  Ie = (e, t = window.localStorage) => ({
    get: () => {
      try {
        const n = t.getItem(e);
        return n ? JSON.parse(n) : null;
      } catch (n) {
        return (
          console.error(`Error parsing storage item for key "${e}":`, n),
          null
        );
      }
    },
    set: (n) => {
      try {
        t.setItem(e, JSON.stringify(n));
      } catch (c) {
        console.error(`Error setting storage item for key "${e}":`, c);
      }
    },
    reset: () => {
      try {
        t.removeItem(e);
      } catch (n) {
        console.error(`Error removing storage item for key "${e}":`, n);
      }
    },
  }),
  ee = (e, t) => {
    const { subscribe: a, notify: s } = fe();
    let o = t;
    return {
      getState: () => o,
      dispatch: (d) => {
        const i = e(o, d);
        i !== o && ((o = i), s());
      },
      subscribe: a,
    };
  };
function r(e, t, ...a) {
  return {
    type: e,
    props: t,
    children: a.flat(1 / 0).filter((s) => s === 0 || !!s),
  };
}
function K(e) {
  return e == null || typeof e == "boolean"
    ? ""
    : typeof e == "string" || typeof e == "number"
      ? String(e)
      : typeof e.type == "function"
        ? K(e.type({ ...e.props, children: e.children }))
        : { ...e, children: e.children.map(K).filter(Boolean) };
}
function Pe(e, t, a = null) {
  (!t && !a) ||
    (a &&
      Object.keys(a).forEach((s) => {
        if (s !== "children")
          if (s.startsWith("on")) {
            const o = s.substring(2).toLowerCase();
            Re(e, o, a[s]);
          } else
            (!t || !(s in t)) &&
              (s === "className"
                ? e.removeAttribute("class")
                : (["checked", "disabled", "selected", "readOnly"].includes(
                    s
                  ) && (e[s] = !1),
                  e.removeAttribute(s)));
      }),
    t &&
      Object.entries(t).forEach(([s, o]) => {
        if (s !== "children") {
          if (s === "className") {
            o ? e.setAttribute("class", o) : e.removeAttribute("class");
            return;
          }
          if (s.startsWith("on")) {
            const n = s.substring(2).toLowerCase();
            he(e, n, o);
            return;
          }
          if (["checked", "disabled", "selected", "readOnly"].includes(s)) {
            e[s] = !!o;
            return;
          }
          o != null && (!a || a[s] !== o) && e.setAttribute(s, String(o));
        }
      }));
}
function be(e, t, a, s = 0) {
  if (!t && a) {
    e.childNodes[s] && e.removeChild(e.childNodes[s]);
    return;
  }
  if (t && !a) {
    e.appendChild(k(t));
    return;
  }
  if (typeof t == "string" || typeof t == "number") {
    if (t !== a) {
      const n = document.createTextNode(String(t));
      e.childNodes[s] ? e.replaceChild(n, e.childNodes[s]) : e.appendChild(n);
    }
    return;
  }
  if (t.type !== a.type) {
    e.childNodes[s]
      ? e.replaceChild(k(t), e.childNodes[s])
      : e.appendChild(k(t));
    return;
  }
  const o = e.childNodes[s];
  if (o) {
    Pe(o, t.props || {}, a.props || {});
    const n = t.children || [],
      c = a.children || [],
      d = Math.max(n.length, c.length);
    for (let i = 0; i < d; i++) be(o, n[i], c[i], i);
    if (c.length > n.length)
      for (let i = c.length - 1; i >= n.length; i--) {
        const l = o.childNodes[i];
        l && o.removeChild(l);
      }
  }
}
const ue = new WeakMap();
function De(e, t) {
  const a = K(e),
    s = ue.get(t);
  if (s) be(t, a, s, 0);
  else {
    const o = k(a);
    t.appendChild(o);
  }
  (Le(t), ue.set(t, a));
}
var I, S, _, C, P, Q;
const E = class E {
  constructor(t = "") {
    L(this, P);
    L(this, I);
    L(this, S);
    L(this, _, fe());
    L(this, C);
    (O(this, I, new Map()),
      O(this, S, null),
      O(this, C, t.replace(/\/$/, "")),
      window.addEventListener("popstate", () => {
        (O(this, S, $(this, P, Q).call(this)), x(this, _).notify());
      }),
      document.addEventListener("click", (a) => {
        if (a.target.closest("[data-link]")) {
          a.preventDefault();
          const s =
            a.target.getAttribute("href") ||
            a.target.closest("[data-link]").getAttribute("href");
          s && this.push(s);
        }
      }));
  }
  get baseUrl() {
    return x(this, C);
  }
  get query() {
    return E.parseQuery(window.location.search);
  }
  set query(t) {
    const a = E.getUrl(t, x(this, C));
    this.push(a);
  }
  get params() {
    var t;
    return ((t = x(this, S)) == null ? void 0 : t.params) ?? {};
  }
  get route() {
    return x(this, S);
  }
  get target() {
    var t;
    return (t = x(this, S)) == null ? void 0 : t.handler;
  }
  subscribe(t) {
    x(this, _).subscribe(t);
  }
  addRoute(t, a) {
    const s = [],
      o = t
        .replace(/:\w+/g, (c) => (s.push(c.slice(1)), "([^/]+)"))
        .replace(/\//g, "\\/"),
      n = new RegExp(`^${x(this, C)}${o}$`);
    x(this, I).set(t, { regex: n, paramNames: s, handler: a });
  }
  push(t) {
    try {
      let a = t.startsWith(x(this, C))
        ? t
        : x(this, C) + (t.startsWith("/") ? t : "/" + t);
      (`${window.location.pathname}${window.location.search}` !== a &&
        window.history.pushState(null, "", a),
        O(this, S, $(this, P, Q).call(this, a)),
        x(this, _).notify());
    } catch (a) {
      console.error("라우터 네비게이션 오류:", a);
    }
  }
  start() {
    (O(this, S, $(this, P, Q).call(this)), x(this, _).notify());
  }
};
((I = new WeakMap()),
  (S = new WeakMap()),
  (_ = new WeakMap()),
  (C = new WeakMap()),
  (P = new WeakSet()),
  (Q = function (t = window.location.pathname) {
    const { pathname: a } = new URL(t, window.location.origin);
    for (const [s, o] of x(this, I)) {
      const n = a.match(o.regex);
      if (n) {
        const c = {};
        return (
          o.paramNames.forEach((d, i) => {
            c[d] = n[i + 1];
          }),
          { ...o, params: c, path: s }
        );
      }
    }
    return null;
  }),
  j(E, "parseQuery", (t = window.location.search) => {
    const a = new URLSearchParams(t),
      s = {};
    for (const [o, n] of a) s[o] = n;
    return s;
  }),
  j(E, "stringifyQuery", (t) => {
    const a = new URLSearchParams();
    for (const [s, o] of Object.entries(t))
      o != null && o !== "" && a.set(s, String(o));
    return a.toString();
  }),
  j(E, "getUrl", (t, a = "") => {
    const o = { ...E.parseQuery(), ...t };
    Object.keys(o).forEach((c) => {
      (o[c] === null || o[c] === void 0 || o[c] === "") && delete o[c];
    });
    const n = E.stringifyQuery(o);
    return `${a}${window.location.pathname.replace(a, "")}${n ? `?${n}` : ""}`;
  }));
let X = E;
const p = {
    SET_PRODUCTS: "products/setProducts",
    ADD_PRODUCTS: "products/addProducts",
    SET_LOADING: "products/setLoading",
    SET_ERROR: "products/setError",
    SET_CATEGORIES: "products/setCategories",
    SET_CURRENT_PRODUCT: "products/setCurrentProduct",
    SET_RELATED_PRODUCTS: "products/setRelatedProducts",
    RESET_FILTERS: "products/resetFilters",
    SETUP: "products/setup",
    SET_STATUS: "products/setStatus",
  },
  h = {
    ADD_ITEM: "cart/addItem",
    REMOVE_ITEM: "cart/removeItem",
    UPDATE_QUANTITY: "cart/updateQuantity",
    CLEAR_CART: "cart/clearCart",
    TOGGLE_SELECT: "cart/toggleSelect",
    SELECT_ALL: "cart/selectAll",
    DESELECT_ALL: "cart/deselectAll",
    REMOVE_SELECTED: "cart/removeSelected",
    LOAD_FROM_STORAGE: "cart/loadFromStorage",
    SYNC_TO_STORAGE: "cart/syncToStorage",
  },
  v = {
    OPEN_CART_MODAL: "ui/openCartModal",
    CLOSE_CART_MODAL: "ui/closeCartModal",
    SHOW_TOAST: "ui/showToast",
    HIDE_TOAST: "ui/hideToast",
  },
  te = {
    products: [],
    totalCount: 0,
    currentProduct: null,
    relatedProducts: [],
    loading: !0,
    error: null,
    status: "idle",
    categories: {},
  },
  Me = (e, t) => {
    switch (t.type) {
      case p.SET_STATUS:
        return { ...e, status: t.payload };
      case p.SET_CATEGORIES:
        return {
          ...e,
          categories: t.payload,
          loading: !1,
          error: null,
          status: "done",
        };
      case p.SET_PRODUCTS:
        return {
          ...e,
          products: t.payload.products,
          totalCount: t.payload.totalCount,
          loading: !1,
          error: null,
          status: "done",
        };
      case p.ADD_PRODUCTS:
        return {
          ...e,
          products: [...e.products, ...t.payload.products],
          totalCount: t.payload.totalCount,
          loading: !1,
          error: null,
          status: "done",
        };
      case p.SET_LOADING:
        return { ...e, loading: t.payload };
      case p.SET_ERROR:
        return { ...e, error: t.payload, loading: !1, status: "done" };
      case p.SET_CURRENT_PRODUCT:
        return {
          ...e,
          currentProduct: t.payload,
          loading: !1,
          error: null,
          status: "done",
        };
      case p.SET_RELATED_PRODUCTS:
        return { ...e, relatedProducts: t.payload, status: "done" };
      case p.SETUP:
        return { ...e, ...t.payload };
      default:
        return e;
    }
  },
  y = ee(Me, te),
  re = Ie("shopping_cart"),
  xe = { items: [], selectedAll: !1 },
  Ue = (e, t) => e.find((a) => a.id === t),
  qe = (e, t) => {
    const a = re.get() ?? xe;
    switch (t.type) {
      case h.ADD_ITEM: {
        const { product: s, quantity: o = 1 } = t.payload;
        if (Ue(a.items, s.productId))
          return {
            ...a,
            items: a.items.map((c) =>
              c.id === s.productId ? { ...c, quantity: c.quantity + o } : c
            ),
          };
        {
          const c = {
            id: s.productId,
            title: s.title,
            image: s.image,
            price: parseInt(s.lprice),
            quantity: o,
            selected: !1,
          };
          return { ...a, items: [...a.items, c] };
        }
      }
      case h.REMOVE_ITEM:
        return { ...a, items: a.items.filter((s) => s.id !== t.payload) };
      case h.UPDATE_QUANTITY: {
        const { productId: s, quantity: o } = t.payload;
        return {
          ...a,
          items: a.items.map((n) =>
            n.id === s ? { ...n, quantity: Math.max(1, o) } : n
          ),
        };
      }
      case h.CLEAR_CART:
        return { ...a, items: [], selectedAll: !1 };
      case h.TOGGLE_SELECT: {
        const s = t.payload,
          o = a.items.map((c) =>
            c.id === s ? { ...c, selected: !c.selected } : c
          ),
          n = o.length > 0 && o.every((c) => c.selected);
        return { ...a, items: o, selectedAll: n };
      }
      case h.SELECT_ALL: {
        const s = a.items.map((o) => ({ ...o, selected: !0 }));
        return { ...a, items: s, selectedAll: !0 };
      }
      case h.DESELECT_ALL: {
        const s = a.items.map((o) => ({ ...o, selected: !1 }));
        return { ...a, items: s, selectedAll: !1 };
      }
      case h.REMOVE_SELECTED:
        return {
          ...a,
          items: a.items.filter((s) => !s.selected),
          selectedAll: !1,
        };
      case h.LOAD_FROM_STORAGE:
        return { ...a, ...t.payload };
      default:
        return a;
    }
  },
  w = ee(qe, xe),
  je = {
    cartModal: { isOpen: !1 },
    globalLoading: !1,
    toast: { isVisible: !1, message: "", type: "info" },
  },
  $e = (e, t) => {
    switch (t.type) {
      case v.OPEN_CART_MODAL:
        return { ...e, cartModal: { isOpen: !0 } };
      case v.CLOSE_CART_MODAL:
        return { ...e, cartModal: { isOpen: !1 } };
      case v.HIDE_TOAST:
        return { ...e, toast: { ...e.toast, isVisible: !1 } };
      case v.SHOW_TOAST:
        return {
          ...e,
          toast: {
            isVisible: !0,
            message: t.payload.message,
            type: t.payload.type || "info",
          },
        };
      default:
        return e;
    }
  },
  N = ee($e, je),
  G = "/front_6th_chapter1-2/",
  u = new X(G),
  Y = new WeakMap(),
  R = { current: null, previous: null },
  He = { mount: null, unmount: null, watches: [], deps: [], mounted: !1 },
  ae = (e) => (Y.has(e) || Y.set(e, { ...He }), Y.get(e)),
  Qe = (e, t) =>
    !Array.isArray(e) || !Array.isArray(t)
      ? !1
      : e.length !== t.length
        ? !0
        : e.some((a, s) => a !== t[s]),
  We = (e) => {
    var a;
    const t = ae(e);
    t.mounted ||
      (console.log("🚀 페이지 마운트:", e.name),
      (a = t.mount) == null || a.call(t),
      (t.mounted = !0),
      (t.deps = []));
  },
  Be = (e) => {
    var a;
    const t = ae(e);
    t.mounted &&
      (console.log("🔻 페이지 언마운트:", e.name),
      (a = t.unmount) == null || a.call(t),
      (t.mounted = !1));
  },
  ve = ({ onMount: e, onUnmount: t, watches: a } = {}, s) => {
    const o = ae(s);
    return (
      typeof e == "function" && (o.mount = e),
      typeof t == "function" && (o.unmount = t),
      Array.isArray(a) && (o.watches = typeof a[0] == "function" ? [a] : a),
      (...n) => {
        const c = R.current !== s;
        return (
          R.current && c && Be(R.current),
          (R.previous = R.current),
          (R.current = s),
          c
            ? We(s)
            : o.watches &&
              o.watches.forEach(([d, i], l) => {
                const m = d();
                (Qe(m, o.deps[l]) &&
                  (console.log(
                    `📊 의존성 변경 감지 (${s.name}):`,
                    o.deps[l],
                    "→",
                    m
                  ),
                  i()),
                  (o.deps[l] = Array.isArray(m) ? [...m] : []));
              }),
          s(...n)
        );
      }
    );
  },
  se = (e) => `${G}${e}`;
async function oe(e = {}) {
  const {
      limit: t = 20,
      search: a = "",
      category1: s = "",
      category2: o = "",
      sort: n = "price_asc",
    } = e,
    c = e.current ?? e.page ?? 1,
    d = new URLSearchParams({
      page: c.toString(),
      limit: t.toString(),
      ...(a && { search: a }),
      ...(s && { category1: s }),
      ...(o && { category2: o }),
      sort: n,
    });
  return await (await fetch(`${se("api/products")}?${d}`)).json();
}
async function Fe(e) {
  return await (await fetch(se(`api/products/${e}`))).json();
}
async function Ge() {
  return await (await fetch(se("api/categories"))).json();
}
const Ve = async () => {
    ((u.query = { current: void 0 }),
      y.dispatch({
        type: p.SETUP,
        payload: { ...te, loading: !0, status: "pending" },
      }));
    try {
      const [
        {
          products: e,
          pagination: { total: t },
        },
        a,
      ] = await Promise.all([oe(u.query), Ge()]);
      y.dispatch({
        type: p.SETUP,
        payload: {
          products: e,
          categories: a,
          totalCount: t,
          loading: !1,
          status: "done",
        },
      });
    } catch (e) {
      throw (y.dispatch({ type: p.SET_ERROR, payload: e.message }), e);
    }
  },
  ne = async (e = !0) => {
    try {
      y.dispatch({
        type: p.SETUP,
        payload: { loading: !0, status: "pending", error: null },
      });
      const {
          products: t,
          pagination: { total: a },
        } = await oe(u.query),
        s = { products: t, totalCount: a };
      if (e) {
        y.dispatch({ type: p.SET_PRODUCTS, payload: s });
        return;
      }
      y.dispatch({ type: p.ADD_PRODUCTS, payload: s });
    } catch (t) {
      throw (y.dispatch({ type: p.SET_ERROR, payload: t.message }), t);
    }
  },
  ze = async () => {
    const e = y.getState();
    !(e.products.length < e.totalCount) ||
      e.loading ||
      ((u.query = { current: Number(u.query.current ?? 1) + 1 }), await ne(!1));
  },
  Ye = (e) => {
    u.query = { search: e, current: 1 };
  },
  B = (e) => {
    u.query = { ...e, current: 1 };
  },
  Je = (e) => {
    u.query = { sort: e, current: 1 };
  },
  Ke = (e) => {
    u.query = { limit: e, current: 1 };
  },
  me = async (e) => {
    try {
      const t = y.getState().currentProduct;
      if (e === (t == null ? void 0 : t.productId)) {
        t.category2 && (await ge(t.category2, e));
        return;
      }
      y.dispatch({
        type: p.SETUP,
        payload: {
          ...te,
          currentProduct: null,
          loading: !0,
          status: "pending",
        },
      });
      const a = await Fe(e);
      (y.dispatch({ type: p.SET_CURRENT_PRODUCT, payload: a }),
        a.category2 && (await ge(a.category2, e)));
    } catch (t) {
      throw (
        console.error("상품 상세 페이지 로드 실패:", t),
        y.dispatch({ type: p.SET_ERROR, payload: t.message }),
        t
      );
    }
  },
  ge = async (e, t) => {
    try {
      const o = (
        await oe({ category2: e, limit: 20, page: 1 })
      ).products.filter((n) => n.productId !== t);
      y.dispatch({ type: p.SET_RELATED_PRODUCTS, payload: o });
    } catch (a) {
      (console.error("관련 상품 로드 실패:", a),
        y.dispatch({ type: p.SET_RELATED_PRODUCTS, payload: [] }));
    }
  },
  Xe = () => {
    try {
      const e = re.get();
      e && w.dispatch({ type: h.LOAD_FROM_STORAGE, payload: e });
    } catch (e) {
      console.error("장바구니 로드 실패:", e);
    }
  },
  T = () => {
    try {
      const e = w.getState();
      re.set(e);
    } catch (e) {
      console.error("장바구니 저장 실패:", e);
    }
  },
  Ne = (e, t = 1) => {
    (w.dispatch({ type: h.ADD_ITEM, payload: { product: e, quantity: t } }),
      T(),
      N.dispatch({
        type: v.SHOW_TOAST,
        payload: { message: "장바구니에 추가되었습니다", type: "success" },
      }),
      setTimeout(() => {
        N.dispatch({ type: v.HIDE_TOAST });
      }, 3e3));
  },
  Ze = (e) => {
    (w.dispatch({ type: h.REMOVE_ITEM, payload: e }), T());
  },
  ce = (e, t) => {
    (w.dispatch({
      type: h.UPDATE_QUANTITY,
      payload: { productId: e, quantity: t },
    }),
      T());
  },
  et = (e) => {
    (w.dispatch({ type: h.TOGGLE_SELECT, payload: e }), T());
  },
  tt = () => {
    (w.dispatch({ type: h.SELECT_ALL }), T());
  },
  rt = () => {
    (w.dispatch({ type: h.DESELECT_ALL }), T());
  },
  at = () => {
    (w.dispatch({ type: h.REMOVE_SELECTED }),
      T(),
      N.dispatch({
        type: v.SHOW_TOAST,
        payload: { message: "선택된 상품들이 삭제되었습니다", type: "info" },
      }),
      setTimeout(() => {
        N.dispatch({ type: v.HIDE_TOAST });
      }, 3e3));
  },
  st = () => {
    (w.dispatch({ type: h.CLEAR_CART }),
      T(),
      N.dispatch({
        type: v.SHOW_TOAST,
        payload: { message: "장바구니가 비워졌습니다", type: "info" },
      }),
      setTimeout(() => {
        N.dispatch({ type: v.HIDE_TOAST });
      }, 3e3));
  },
  g = ({ src: e, ...t }) => {
    const a = String(G + e).replace("//", "/");
    return r("img", { src: a, ...t });
  },
  ot = [10, 20, 50, 100],
  nt = [
    { value: "price_asc", label: "가격 낮은순" },
    { value: "price_desc", label: "가격 높은순" },
    { value: "name_asc", label: "이름순" },
    { value: "name_desc", label: "이름 역순" },
  ],
  ct = async (e) => {
    if (e.key === "Enter") {
      const t = e.target.value.trim();
      try {
        await Ye(t);
      } catch (a) {
        console.error("검색 실패:", a);
      }
    }
  },
  lt = async (e) => {
    const t = parseInt(e.target.value);
    try {
      await Ke(t);
    } catch (a) {
      console.error("상품 수 변경 실패:", a);
    }
  },
  it = async (e) => {
    const t = e.target.value;
    try {
      await Je(t);
    } catch (a) {
      console.error("정렬 변경 실패:", a);
    }
  },
  pe = async (e) => {
    const t = e.target.getAttribute("data-breadcrumb");
    try {
      if (t === "reset") await B({ category1: "", category2: "" });
      else if (t === "category1") {
        const a = e.target.getAttribute("data-category1");
        await B({ category1: a, category2: "" });
      }
    } catch (a) {
      console.error("브레드크럼 네비게이션 실패:", a);
    }
  },
  dt = async (e) => {
    const t = e.target.getAttribute("data-category1");
    if (t)
      try {
        await B({ category1: t, category2: "" });
      } catch (a) {
        console.error("1depth 카테고리 선택 실패:", a);
      }
  },
  ut = async (e) => {
    const t = e.target.getAttribute("data-category1"),
      a = e.target.getAttribute("data-category2");
    if (!(!t || !a))
      try {
        await B({ category1: t, category2: a });
      } catch (s) {
        console.error("2depth 카테고리 선택 실패:", s);
      }
  };
function mt({
  searchQuery: e = "",
  limit: t = 20,
  sort: a = "price_asc",
  category: s = {},
  categories: o = {},
}) {
  const n = Object.keys(o).length > 0 ? Object.keys(o) : [],
    c = ot.map((l) =>
      r("option", { key: l, value: l, selected: Number(t) === l }, l, "개")
    ),
    d = nt.map(({ value: l, label: m }) =>
      r("option", { key: l, value: l, selected: a === l }, m)
    ),
    i = n.map((l) =>
      r(
        "button",
        {
          key: l,
          "data-category1": l,
          className: `category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                 bg-white border-gray-300 text-gray-700 hover:bg-gray-50`,
          onClick: dt,
        },
        l
      )
    );
  return r(
    "div",
    {
      className:
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4",
    },
    r(
      "div",
      { className: "mb-4" },
      r(
        "div",
        { className: "relative" },
        r("input", {
          type: "text",
          id: "search-input",
          placeholder: "상품명을 검색해보세요...",
          value: e,
          className: `w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500`,
          onKeyDown: ct,
        }),
        r(
          "div",
          {
            className:
              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
          },
          r(g, {
            src: "/search-icon.svg",
            alt: "검색",
            className: "h-5 w-5 text-gray-400",
          })
        )
      )
    ),
    r(
      "div",
      { className: "space-y-3" },
      r(
        "div",
        { className: "space-y-2" },
        r(
          "div",
          { className: "flex items-center gap-2" },
          r("label", { className: "text-sm text-gray-600" }, "카테고리:"),
          ["전체", s.category1, s.category2]
            .filter((l, m) => m === 0 || !!l)
            .map((l, m) => {
              if (l === "전체")
                return r(
                  "button",
                  {
                    key: "reset",
                    "data-breadcrumb": "reset",
                    className: "text-xs hover:text-blue-800 hover:underline",
                    onClick: pe,
                  },
                  "전체"
                );
              if (m === 1)
                return r(
                  "button",
                  {
                    key: l,
                    "data-breadcrumb": "category1",
                    "data-category1": l,
                    className: "text-xs hover:text-blue-800 hover:underline",
                    onClick: pe,
                  },
                  l
                );
              if (m === 2)
                return r(
                  "span",
                  { key: l, className: "text-xs text-gray-600 cursor-default" },
                  l
                );
            })
            .reduce(
              (l, m, f) => (
                f > 0 &&
                  l.push(
                    r("span", { className: "text-xs text-gray-500" }, ">")
                  ),
                l.push(m),
                l
              ),
              []
            )
        ),
        !s.category1 &&
          r(
            "div",
            { className: "flex flex-wrap gap-2" },
            n.length > 0
              ? i
              : r(
                  "div",
                  { className: "text-sm text-gray-500 italic" },
                  "카테고리 로딩 중..."
                )
          ),
        s.category1 &&
          o[s.category1] &&
          r(
            "div",
            { className: "space-y-2" },
            r(
              "div",
              { className: "flex flex-wrap gap-2" },
              Object.keys(o[s.category1]).map((l) => {
                const m = s.category2 === l;
                return r(
                  "button",
                  {
                    key: l,
                    "data-category1": s.category1,
                    "data-category2": l,
                    className: `category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                               ${m ? "bg-blue-100 border-blue-300 text-blue-800" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`,
                    onClick: ut,
                  },
                  l
                );
              })
            )
          )
      ),
      r(
        "div",
        { className: "flex gap-2 items-center justify-between" },
        r(
          "div",
          { className: "flex items-center gap-2" },
          r("label", { className: "text-sm text-gray-600" }, "개수:"),
          r(
            "select",
            {
              id: "limit-select",
              className:
                "text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              onChange: lt,
            },
            c
          )
        ),
        r(
          "div",
          { className: "flex items-center gap-2" },
          r("label", { className: "text-sm text-gray-600" }, "정렬:"),
          r(
            "select",
            {
              id: "sort-select",
              className: `text-sm border border-gray-300 rounded px-2 py-1
                           focus:ring-1 focus:ring-blue-500 focus:border-blue-500`,
              onChange: it,
            },
            d
          )
        )
      )
    )
  );
}
const gt = (e) => {
    const t = e.target.closest("[data-product-id]"),
      a = t.getAttribute("data-product-id"),
      s = t.previousElementSibling;
    if (a && s) {
      const o = parseInt(s.value) + 1;
      ((s.value = o), ce(a, o));
    }
  },
  pt = (e) => {
    const t = e.target.closest("[data-product-id]"),
      a = t.getAttribute("data-product-id"),
      s = t.nextElementSibling;
    if (a && s) {
      const o = Math.max(1, parseInt(s.value) - 1);
      ((s.value = o), ce(a, o));
    }
  },
  yt = (e, t) => {
    const a = Math.max(1, parseInt(t) || 1);
    e && ce(e, a);
  };
function ht({ id: e, title: t, image: a, price: s, quantity: o, selected: n }) {
  const c = s * o;
  return r(
    "div",
    {
      className: "flex items-center py-3 border-b border-gray-100 cart-item",
      "data-product-id": e,
    },
    r(
      "label",
      { className: "flex items-center mr-3" },
      r("input", {
        type: "checkbox",
        checked: n,
        className: `cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded
                      focus:ring-blue-500`,
        "data-product-id": e,
        onChange: () => et(e),
      })
    ),
    r(
      "div",
      {
        className:
          "w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0",
      },
      r("img", {
        src: a,
        alt: t,
        className: "w-full h-full object-cover cursor-pointer cart-item-image",
        "data-product-id": e,
      })
    ),
    r(
      "div",
      { className: "flex-1 min-w-0" },
      r(
        "h4",
        {
          className:
            "text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title",
          "data-product-id": e,
        },
        t
      ),
      r(
        "p",
        { className: "text-sm text-gray-600 mt-1" },
        s.toLocaleString(),
        "원"
      ),
      r(
        "div",
        { className: "flex items-center mt-2" },
        r(
          "button",
          {
            className: `quantity-decrease-btn w-7 h-7 flex items-center justify-center
                         border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100`,
            "data-product-id": e,
            onClick: pt,
          },
          r(g, { src: "/minus-icon.svg", alt: "감소", className: "w-3 h-3" })
        ),
        r("input", {
          type: "number",
          value: o,
          min: "1",
          className: `quantity-input w-12 h-7 text-center text-sm border-t border-b
                        border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500`,
          disabled: !0,
          "data-product-id": e,
          onChange: (d) => yt(e, d.target.value),
        }),
        r(
          "button",
          {
            className: `quantity-increase-btn w-7 h-7 flex items-center justify-center
                         border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100`,
            "data-product-id": e,
            onClick: gt,
          },
          r(g, { src: "/plus-icon.svg", alt: "증가", className: "w-3 h-3" })
        )
      )
    ),
    r(
      "div",
      { className: "text-right ml-3" },
      r(
        "p",
        { className: "text-sm font-medium text-gray-900" },
        c.toLocaleString(),
        "원"
      ),
      r(
        "button",
        {
          className:
            "cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800",
          "data-product-id": e,
          onClick: () => Ze(e),
        },
        "삭제"
      )
    )
  );
}
const ye = () => {
    N.dispatch({ type: v.CLOSE_CART_MODAL });
  },
  ft = (e) => {
    e.target.checked ? tt() : rt();
  },
  bt = () => {
    N.dispatch({
      type: v.SHOW_TOAST,
      payload: { message: "구매 기능은 추후 구현 예정입니다.", type: "info" },
    });
  };
let Z = !1;
const we = (e) => {
    e.key === "Escape" &&
      (N.getState().cartModal.isOpen &&
        N.dispatch({ type: v.CLOSE_CART_MODAL }),
      document.removeEventListener("keydown", we),
      (Z = !1));
  },
  xt = () => {
    Z || (document.addEventListener("keydown", we), (Z = !0));
  };
function vt({ items: e = [], selectedAll: t = !1, isOpen: a = !1 }) {
  if ((xt(), !a)) return "";
  const s = e.filter((d) => d.selected),
    o = s.length,
    n = e.reduce((d, i) => d + i.price * i.quantity, 0),
    c = s.reduce((d, i) => d + i.price * i.quantity, 0);
  return r(
    "div",
    { className: "fixed inset-0 z-50 overflow-y-auto cart-modal" },
    r("div", {
      className:
        "fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay",
      onClick: ye,
    }),
    r(
      "div",
      {
        className:
          "flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4",
      },
      r(
        "div",
        {
          className:
            "relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden",
        },
        r(
          "div",
          {
            className:
              "sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between",
          },
          r(
            "h2",
            { className: "text-lg font-bold text-gray-900 flex items-center" },
            r(g, {
              src: "/cart-icon.svg",
              alt: "장바구니",
              className: "w-5 h-5 mr-2",
            }),
            "장바구니",
            e.length > 0 &&
              r(
                "span",
                { className: "text-sm font-normal text-gray-600 ml-1" },
                "(",
                e.length,
                ")"
              )
          ),
          r(
            "button",
            {
              id: "cart-modal-close-btn",
              className: "text-gray-400 hover:text-gray-600 p-1",
              onClick: ye,
            },
            r(g, { src: "/close-icon.svg", alt: "닫기", className: "w-6 h-6" })
          )
        ),
        e.length === 0
          ? r(
              "div",
              { className: "flex-1 flex items-center justify-center p-8" },
              r(
                "div",
                { className: "text-center" },
                r(
                  "div",
                  { className: "text-gray-400 mb-4" },
                  r(g, {
                    src: "/empty-cart-icon.svg",
                    alt: "빈 장바구니",
                    className: "mx-auto h-12 w-12",
                  })
                ),
                r(
                  "h3",
                  { className: "text-lg font-medium text-gray-900 mb-2" },
                  "장바구니가 비어있습니다"
                ),
                r(
                  "p",
                  { className: "text-gray-600" },
                  "원하는 상품을 담아보세요!"
                )
              )
            )
          : r(
              "div",
              { className: "flex flex-col max-h-[calc(90vh-120px)]" },
              r(
                "div",
                { className: "p-4 border-b border-gray-200 bg-gray-50" },
                r(
                  "label",
                  { className: "flex items-center text-sm text-gray-700" },
                  r("input", {
                    type: "checkbox",
                    id: "cart-modal-select-all-checkbox",
                    checked: t,
                    className:
                      "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2",
                    onChange: ft,
                  }),
                  "전체선택 (",
                  e.length,
                  "개)"
                )
              ),
              r(
                "div",
                { className: "flex-1 overflow-y-auto" },
                r(
                  "div",
                  { className: "p-4 space-y-4" },
                  e.map((d) => r(ht, { ...d }))
                )
              )
            ),
        e.length > 0 &&
          r(
            "div",
            {
              className:
                "sticky bottom-0 bg-white border-t border-gray-200 p-4",
            },
            o > 0 &&
              r(
                "div",
                { className: "flex justify-between items-center mb-3 text-sm" },
                r(
                  "span",
                  { className: "text-gray-600" },
                  "선택한 상품 (",
                  o,
                  "개)"
                ),
                r(
                  "span",
                  { className: "font-medium" },
                  c.toLocaleString(),
                  "원"
                )
              ),
            r(
              "div",
              { className: "flex justify-between items-center mb-4" },
              r(
                "span",
                { className: "text-lg font-bold text-gray-900" },
                "총 금액"
              ),
              r(
                "span",
                { className: "text-xl font-bold text-blue-600" },
                n.toLocaleString(),
                "원"
              )
            ),
            r(
              "div",
              { className: "space-y-2" },
              o > 0 &&
                r(
                  "button",
                  {
                    id: "cart-modal-remove-selected-btn",
                    className: `w-full bg-red-600 text-white py-2 px-4 rounded-md
                                 hover:bg-red-700 transition-colors text-sm`,
                    onClick: at,
                  },
                  "선택한 상품 삭제 (",
                  o,
                  "개)"
                ),
              r(
                "div",
                { className: "flex gap-2" },
                r(
                  "button",
                  {
                    id: "cart-modal-clear-cart-btn",
                    className: `flex-1 bg-gray-600 text-white py-2 px-4 rounded-md
                                 hover:bg-gray-700 transition-colors text-sm`,
                    onClick: st,
                  },
                  "전체 비우기"
                ),
                r(
                  "button",
                  {
                    id: "cart-modal-checkout-btn",
                    className: `flex-1 bg-blue-600 text-white py-2 px-4 rounded-md
                                 hover:bg-blue-700 transition-colors text-sm`,
                    onClick: bt,
                  },
                  "구매하기"
                )
              )
            )
          )
      )
    )
  );
}
const Nt = ({ error: e }) =>
    r(
      "div",
      { className: "min-h-screen bg-gray-50 flex items-center justify-center" },
      r(
        "div",
        { className: "text-center" },
        r(
          "div",
          { className: "text-red-500 mb-4" },
          r(g, {
            src: "/error-large-icon.svg",
            alt: "오류",
            className: "mx-auto h-12 w-12",
          })
        ),
        r(
          "h1",
          { className: "text-xl font-bold text-gray-900 mb-2" },
          "상품을 찾을 수 없습니다"
        ),
        r(
          "p",
          { className: "text-gray-600 mb-4" },
          e || "요청하신 상품이 존재하지 않습니다."
        ),
        r(
          "button",
          {
            onClick: () => window.history.back(),
            className:
              "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2",
          },
          "이전 페이지"
        ),
        r(
          "a",
          {
            href: "/",
            "data-link": "/",
            className:
              "bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700",
          },
          "홈으로"
        )
      )
    ),
  wt = () => {
    N.dispatch({ type: v.HIDE_TOAST });
  };
function St({ isVisible: e = !1, message: t = "", type: a = "info" }) {
  if (!e) return "";
  const s = () => {
      switch (a) {
        case "success":
          return {
            bg: "bg-green-600",
            icon: r(g, {
              src: "/success-icon.svg",
              alt: "성공",
              className: "w-5 h-5",
            }),
          };
        case "error":
          return {
            bg: "bg-red-600",
            icon: r(g, {
              src: "/error-icon.svg",
              alt: "오류",
              className: "w-5 h-5",
            }),
          };
        case "warning":
          return {
            bg: "bg-yellow-600",
            icon: r(g, {
              src: "/warning-icon.svg",
              alt: "경고",
              className: "w-5 h-5",
            }),
          };
        default:
          return {
            bg: "bg-blue-600",
            icon: r(g, {
              src: "/info-icon.svg",
              alt: "정보",
              className: "w-5 h-5",
            }),
          };
      }
    },
    { bg: o, icon: n } = s();
  return r(
    "div",
    {
      className:
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 toast-container",
    },
    r(
      "div",
      {
        className: `${o} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm`,
      },
      r("div", { className: "flex-shrink-0" }, n),
      r("p", { className: "text-sm font-medium" }, t),
      r(
        "button",
        {
          id: "toast-close-btn",
          className: "flex-shrink-0 ml-2 text-white hover:text-gray-200",
          onClick: wt,
        },
        r(g, {
          src: "/close-icon-white.svg",
          alt: "닫기",
          className: "w-4 h-4",
        })
      )
    )
  );
}
function Et() {
  return r(
    "h1",
    { className: "text-xl font-bold text-gray-900" },
    r("a", { href: "/", "data-link": "/" }, "쇼핑몰")
  );
}
function Ct() {
  return r(
    "footer",
    { className: "bg-white shadow-sm sticky top-0 z-40" },
    r(
      "div",
      { className: "max-w-md mx-auto py-8 text-center text-gray-500" },
      r(
        "p",
        null,
        "© ",
        new Date().getFullYear(),
        " 항해플러스 프론트엔드 쇼핑몰"
      )
    )
  );
}
const Tt = async (e) => {
  const a = y.getState().products.find((s) => s.productId === e);
  a && Ne(a, 1);
};
function At({
  productId: e,
  title: t,
  image: a,
  lprice: s,
  brand: o,
  onClick: n,
}) {
  const c = Number(s),
    d = (i) => {
      (i.preventDefault(), n(e));
    };
  return r(
    "div",
    {
      className:
        "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card",
      "data-product-id": e,
    },
    r(
      "div",
      {
        className:
          "aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image",
        onClick: d,
      },
      r("img", {
        src: a,
        alt: t,
        className:
          "w-full h-full object-cover hover:scale-105 transition-transform duration-200",
        loading: "lazy",
      })
    ),
    r(
      "div",
      { className: "p-3" },
      r(
        "div",
        { className: "cursor-pointer product-info mb-3", onClick: d },
        r(
          "h3",
          { className: "text-sm font-medium text-gray-900 line-clamp-2 mb-1" },
          t
        ),
        r("p", { className: "text-xs text-gray-500 mb-2" }, o),
        r(
          "p",
          { className: "text-lg font-bold text-gray-900" },
          c.toLocaleString(),
          "원"
        )
      ),
      r(
        "button",
        {
          className: `w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                       hover:bg-blue-700 transition-colors add-to-cart-btn`,
          "data-product-id": e,
          onClick: () => Tt(e),
        },
        "장바구니 담기"
      )
    )
  );
}
function Ot() {
  return r(
    "div",
    {
      className:
        "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse",
    },
    r("div", { className: "aspect-square bg-gray-200" }),
    r(
      "div",
      { className: "p-3" },
      r("div", { className: "h-4 bg-gray-200 rounded mb-2" }),
      r("div", { className: "h-3 bg-gray-200 rounded w-2/3 mb-2" }),
      r("div", { className: "h-5 bg-gray-200 rounded w-1/2 mb-3" }),
      r("div", { className: "h-8 bg-gray-200 rounded" })
    )
  );
}
const _t = async () => {
    try {
      await ne(!0);
    } catch (e) {
      console.error("재시도 실패:", e);
    }
  },
  Lt = async (e) => {
    u.push(`/product/${e}`);
  };
function Rt({
  products: e = [],
  loading: t = !1,
  error: a = null,
  totalCount: s = 0,
  hasMore: o = !0,
}) {
  return a
    ? r(
        "div",
        { className: "text-center py-12" },
        r(
          "div",
          { className: "text-red-500 mb-4" },
          r(g, {
            src: "/error-large-icon.svg",
            alt: "오류",
            className: "mx-auto h-12 w-12",
          })
        ),
        r(
          "h3",
          { className: "text-lg font-medium text-gray-900 mb-2" },
          "오류가 발생했습니다"
        ),
        r("p", { className: "text-gray-600 mb-4" }, a),
        r(
          "button",
          {
            id: "retry-btn",
            className:
              "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700",
            onClick: _t,
          },
          "다시 시도"
        )
      )
    : !t && e.length === 0
      ? r(
          "div",
          { className: "text-center py-12" },
          r(
            "div",
            { className: "text-gray-400 mb-4" },
            r(g, {
              src: "/search-large-icon.svg",
              alt: "검색",
              className: "mx-auto h-12 w-12",
            })
          ),
          r(
            "h3",
            { className: "text-lg font-medium text-gray-900 mb-2" },
            "상품을 찾을 수 없습니다"
          ),
          r("p", { className: "text-gray-600" }, "다른 검색어를 시도해보세요.")
        )
      : r(
          "div",
          null,
          s > 0 &&
            r(
              "div",
              { className: "mb-4 text-sm text-gray-600" },
              "총 ",
              r(
                "span",
                { className: "font-medium text-gray-900" },
                s.toLocaleString(),
                "개"
              ),
              "의 상품"
            ),
          r(
            "div",
            { className: "grid grid-cols-2 gap-4 mb-6", id: "products-grid" },
            e.map((n) => r(At, { ...n, onClick: Lt })),
            t && Array.from({ length: 6 }).map(() => r(Ot, null))
          ),
          t &&
            e.length > 0 &&
            r(
              "div",
              { className: "text-center py-4" },
              r(
                "div",
                { className: "inline-flex items-center" },
                r(g, {
                  src: "/loading-icon.svg",
                  alt: "로딩",
                  className: "animate-spin h-5 w-5 text-blue-600 mr-2",
                }),
                r(
                  "span",
                  { className: "text-sm text-gray-600" },
                  "상품을 불러오는 중..."
                )
              )
            ),
          !o &&
            e.length > 0 &&
            !t &&
            r(
              "div",
              { className: "text-center py-4 text-sm text-gray-500" },
              "모든 상품을 확인했습니다"
            ),
          r("div", { id: "scroll-trigger", className: "h-4" })
        );
}
const kt = async (e) => {
    const t = new URLSearchParams(e).toString();
    u.push(`/?${t}`);
  },
  It = async () => {
    const e = y.getState().currentProduct,
      t = {
        category1: e == null ? void 0 : e.category1,
        category2: e == null ? void 0 : e.category2,
        currentPage: 1,
      },
      a = new URLSearchParams(t).toString();
    u.push(`/?${a}`);
  },
  Pt = () => {
    const e = document.getElementById("quantity-input");
    if (e) {
      const t = parseInt(e.getAttribute("max")) || 100;
      e.value = Math.min(t, parseInt(e.value) + 1);
    }
  },
  Dt = () => {
    const e = document.getElementById("quantity-input");
    e && (e.value = Math.max(1, parseInt(e.value) - 1));
  },
  Mt = () => {
    const e = document.getElementById("quantity-input"),
      t = e ? parseInt(e.value) : 1,
      s = y.getState().currentProduct;
    s && (console.log("🛒 상품 상세 페이지에서 장바구니 추가:", s), Ne(s, t));
  };
function Ut({ product: e, relatedProducts: t = [] }) {
  const {
      productId: a,
      title: s,
      image: o,
      lprice: n,
      brand: c,
      description: d = "",
      rating: i = 0,
      reviewCount: l = 0,
      stock: m = 100,
      category1: f,
      category2: A,
    } = e,
    V = Number(n),
    D = [];
  return (
    f && D.push({ name: f, category: "category1", value: f }),
    A && D.push({ name: A, category: "category2", value: A }),
    r(
      "div",
      null,
      D.length > 0 &&
        r(
          "nav",
          { className: "mb-4" },
          r(
            "div",
            { className: "flex items-center space-x-2 text-sm text-gray-600" },
            r(
              "a",
              {
                href: "/",
                "data-link": "/",
                className: "hover:text-blue-600 transition-colors",
              },
              "홈"
            ),
            D.map((b, M) => [
              r(g, {
                key: `${b.category}-icon`,
                src: "/chevron-right-icon.svg",
                alt: "오른쪽 화살표",
                className: "w-4 h-4 text-gray-400",
              }),
              r(
                "button",
                {
                  key: `${b.category}-btn`,
                  className: "breadcrumb-link",
                  [`data-${b.category}`]: b.value,
                  onClick: () =>
                    kt(
                      M === 0
                        ? { category1: b.value }
                        : { category1: D[M - 1].value, category2: b.value }
                    ),
                },
                b.name
              ),
            ]).flat()
          )
        ),
      r(
        "div",
        { className: "bg-white rounded-lg shadow-sm mb-6" },
        r(
          "div",
          { className: "p-4" },
          r(
            "div",
            {
              className:
                "aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4",
            },
            r("img", {
              src: o,
              alt: s,
              className: "w-full h-full object-cover product-detail-image",
            })
          ),
          r(
            "div",
            null,
            r("p", { className: "text-sm text-gray-600 mb-1" }, c),
            r("h1", { className: "text-xl font-bold text-gray-900 mb-3" }, s),
            i > 0 &&
              r(
                "div",
                { className: "flex items-center mb-3" },
                r(
                  "div",
                  { className: "flex items-center" },
                  Array(5)
                    .fill(0)
                    .map((b, M) =>
                      r(g, {
                        key: M,
                        src: "/star-icon.svg",
                        alt: "별점",
                        className: `w-4 h-4 ${M < i ? "text-yellow-400" : "text-gray-300"}`,
                      })
                    )
                ),
                r(
                  "span",
                  { className: "ml-2 text-sm text-gray-600" },
                  i,
                  ".0 (",
                  l.toLocaleString(),
                  "개 리뷰)"
                )
              ),
            r(
              "div",
              { className: "mb-4" },
              r(
                "span",
                { className: "text-2xl font-bold text-blue-600" },
                V.toLocaleString(),
                "원"
              )
            ),
            r(
              "div",
              { className: "text-sm text-gray-600 mb-4" },
              "재고 ",
              m.toLocaleString(),
              "개"
            ),
            d &&
              r(
                "div",
                { className: "text-sm text-gray-700 leading-relaxed mb-6" },
                d
              )
          )
        ),
        r(
          "div",
          { className: "border-t border-gray-200 p-4" },
          r(
            "div",
            { className: "flex items-center justify-between mb-4" },
            r(
              "span",
              { className: "text-sm font-medium text-gray-900" },
              "수량"
            ),
            r(
              "div",
              { className: "flex items-center" },
              r(
                "button",
                {
                  id: "quantity-decrease",
                  className: `w-8 h-8 flex items-center justify-center border border-gray-300
                             rounded-l-md bg-gray-50 hover:bg-gray-100`,
                  onClick: Dt,
                },
                r(g, {
                  src: "/quantity-minus-icon.svg",
                  alt: "수량 감소",
                  className: "w-4 h-4",
                })
              ),
              r("input", {
                type: "number",
                id: "quantity-input",
                value: "1",
                min: "1",
                max: m,
                className: `w-16 h-8 text-center text-sm border-t border-b border-gray-300
                            focus:ring-1 focus:ring-blue-500 focus:border-blue-500`,
              }),
              r(
                "button",
                {
                  id: "quantity-increase",
                  className: `w-8 h-8 flex items-center justify-center border border-gray-300
                             rounded-r-md bg-gray-50 hover:bg-gray-100`,
                  onClick: Pt,
                },
                r(g, {
                  src: "/quantity-plus-icon.svg",
                  alt: "수량 증가",
                  className: "w-4 h-4",
                })
              )
            )
          ),
          r(
            "button",
            {
              id: "add-to-cart-btn",
              "data-product-id": a,
              className: `w-full bg-blue-600 text-white py-3 px-4 rounded-md
                         hover:bg-blue-700 transition-colors font-medium`,
              onClick: Mt,
            },
            "장바구니 담기"
          )
        )
      ),
      r(
        "div",
        { className: "mb-6" },
        r(
          "button",
          {
            className: `block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md
                  hover:bg-gray-200 transition-colors go-to-product-list`,
            onClick: It,
          },
          "상품 목록으로 돌아가기"
        )
      ),
      t.length > 0 &&
        r(
          "div",
          { className: "bg-white rounded-lg shadow-sm" },
          r(
            "div",
            { className: "p-4 border-b border-gray-200" },
            r(
              "h2",
              { className: "text-lg font-bold text-gray-900" },
              "관련 상품"
            ),
            r(
              "p",
              { className: "text-sm text-gray-600" },
              "같은 카테고리의 다른 상품들"
            )
          ),
          r(
            "div",
            { className: "p-4" },
            r(
              "div",
              { className: "grid grid-cols-2 gap-3 responsive-grid" },
              t
                .slice(0, 20)
                .map((b) =>
                  r(
                    "div",
                    {
                      key: b.productId,
                      className:
                        "bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer",
                      "data-product-id": b.productId,
                      onClick: () => u.push(`/product/${b.productId}`),
                    },
                    r(
                      "div",
                      {
                        className:
                          "aspect-square bg-white rounded-md overflow-hidden mb-2",
                      },
                      r("img", {
                        src: b.image,
                        alt: b.title,
                        className: "w-full h-full object-cover",
                        loading: "lazy",
                      })
                    ),
                    r(
                      "h3",
                      {
                        className:
                          "text-sm font-medium text-gray-900 mb-1 line-clamp-2",
                      },
                      b.title
                    ),
                    r(
                      "p",
                      { className: "text-sm font-bold text-blue-600" },
                      Number(b.lprice).toLocaleString(),
                      "원"
                    )
                  )
                )
            )
          )
        )
    )
  );
}
const qt = (e = 200) => {
    const t = window.pageYOffset || document.documentElement.scrollTop,
      a = window.innerHeight,
      s = document.documentElement.scrollHeight;
    return t + a >= s - e;
  },
  jt = (e) => {
    let t = !1;
    return (...a) => {
      t ||
        ((t = !0),
        queueMicrotask(() => {
          ((t = !1), e(...a));
        }));
    };
  },
  $t = () => {
    N.dispatch({ type: v.OPEN_CART_MODAL });
  },
  le = ({ headerLeft: e, children: t }) => {
    const a = w.getState(),
      { cartModal: s, toast: o } = N.getState(),
      n = a.items.length,
      c = r(
        "span",
        {
          className:
            "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",
        },
        n > 99 ? "99+" : n
      );
    return r(
      "div",
      { className: "min-h-screen bg-gray-50" },
      r(
        "header",
        { className: "bg-white shadow-sm sticky top-0 z-40" },
        r(
          "div",
          { className: "max-w-md mx-auto px-4 py-4" },
          r(
            "div",
            { className: "flex items-center justify-between" },
            e,
            r(
              "div",
              { className: "flex items-center space-x-2" },
              r(
                "button",
                {
                  id: "cart-icon-btn",
                  className:
                    "relative p-2 text-gray-700 hover:text-gray-900 transition-colors",
                  onClick: $t,
                },
                r(g, {
                  src: "/cart-header-icon.svg",
                  alt: "장바구니",
                  className: "w-6 h-6",
                }),
                n > 0 && c
              )
            )
          )
        )
      ),
      r("main", { className: "max-w-md mx-auto px-4 py-4" }, t),
      r(vt, { ...a, isOpen: s.isOpen }),
      r(St, { ...o }),
      r(Ct, null)
    );
  },
  Se = r(
    "h1",
    { className: "text-xl font-bold text-gray-900" },
    r("a", { href: "/", "data-link": "/" }, "쇼핑몰")
  );
console.log(Se);
let F = !1;
const Ee = async () => {
    var e;
    if (((e = u.route) == null ? void 0 : e.path) === "/" && qt(200)) {
      const t = y.getState(),
        a = t.products.length < t.totalCount;
      if (t.loading || !a) return;
      try {
        await ze();
      } catch (s) {
        console.error("무한 스크롤 로드 실패:", s);
      }
    }
  },
  Ht = () => {
    F || (window.addEventListener("scroll", Ee), (F = !0));
  },
  Qt = () => {
    F && (window.removeEventListener("scroll", Ee), (F = !1));
  },
  Wt = ve(
    {
      onMount: () => {
        (Ht(), Ve());
      },
      onUnmount: () => {
        Qt();
      },
      watches: [
        () => {
          const {
            search: e,
            limit: t,
            sort: a,
            category1: s,
            category2: o,
          } = u.query;
          return [e, t, a, s, o];
        },
        () => ne(!0),
      ],
    },
    () => {
      console.log("🏠 홈 페이지 로드");
      const e = y.getState(),
        { search: t, limit: a, sort: s, category1: o, category2: n } = u.query,
        { products: c, loading: d, error: i, totalCount: l, categories: m } = e,
        f = { category1: o, category2: n },
        A = c.length < l;
      return r(
        le,
        { headerLeft: Se },
        r(mt, {
          searchQuery: t,
          category: f,
          sort: s,
          limit: a,
          categories: m,
        }),
        r(
          "div",
          { className: "mb-6" },
          r(Rt, {
            products: c,
            loading: d,
            error: i,
            totalCount: l,
            hasMore: A,
          })
        )
      );
    }
  ),
  Bt = ve(
    {
      onMount: () => {
        me(u.params.id);
      },
      watches: [() => [u.params.id], () => me(u.params.id)],
    },
    () => {
      const {
        currentProduct: e,
        relatedProducts: t = [],
        error: a,
        loading: s,
      } = y.getState();
      return r(
        le,
        {
          headerLeft: r(
            "div",
            { className: "flex items-center space-x-3" },
            r(
              "button",
              {
                onClick: () => window.history.back(),
                className:
                  "p-2 text-gray-700 hover:text-gray-900 transition-colors",
              },
              r(g, { src: "/back-icon.svg", alt: "뒤로", className: "w-6 h-6" })
            ),
            r(
              "h1",
              { className: "text-lg font-bold text-gray-900" },
              "상품 상세"
            )
          ),
        },
        r(
          "div",
          { className: "min-h-screen bg-gray-50 p-4" },
          s
            ? r(
                "div",
                {
                  className:
                    "min-h-screen bg-gray-50 flex items-center justify-center",
                },
                r(
                  "div",
                  { className: "text-center" },
                  r("div", {
                    className:
                      "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4",
                  }),
                  r(
                    "p",
                    { className: "text-gray-600" },
                    "상품 정보를 불러오는 중..."
                  )
                )
              )
            : a && !e
              ? r(Nt, { error: a })
              : r(Ut, { product: e, relatedProducts: t })
        )
      );
    }
  ),
  Ft = () =>
    le({
      headerLeft: Et(),
      children: r(
        "div",
        {
          className: "text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg",
        },
        r(g, { src: "/404.svg", alt: "페이지를 찾을 수 없습니다" }),
        r(
          "a",
          {
            href: "/",
            "data-link": "/",
            className:
              "inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
          },
          "홈으로"
        )
      ),
    });
u.addRoute("/", Wt);
u.addRoute("/product/:id", Bt);
u.addRoute(".*", Ft);
const H = jt(() => {
  const e = document.getElementById("root");
  if (!e) return;
  const t = u.target;
  De(r(t, null), e);
});
function Gt() {
  (y.subscribe(H), w.subscribe(H), N.subscribe(H), u.subscribe(H));
}
const Vt = () =>
  _e(async () => {
    const { worker: e } = await import("./browser-ipwmi47v.js");
    return { worker: e };
  }, []).then(({ worker: e }) =>
    e.start({
      serviceWorker: { url: `${G}mockServiceWorker.js` },
      onUnhandledRequest: "bypass",
    })
  );
function zt() {
  (console.log("🚀 애플리케이션이 시작되었습니다."),
    console.log("✅ MSW 워커 시작 완료"),
    Xe(),
    console.log("✅ 장바구니 데이터 복원 완료"),
    Gt(),
    console.log("✅ 렌더링 시스템 초기화 완료"),
    u.start(),
    console.log("✅ 렌더링 설정 완료"),
    console.log("🎉 애플리케이션 초기화 완료!"));
}
Vt().then(zt);
