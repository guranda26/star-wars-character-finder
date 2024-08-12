import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, LiveReload, useSearchParams, Link } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createContext, useState, useContext, useEffect } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const initialState = {
  items: {}
};
const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    selectItem(state, action) {
      const item = action.payload;
      state.items[item.name] = item;
    },
    unselectItem(state, action) {
      delete state.items[action.payload];
    },
    unselectAllItems(state) {
      state.items = {};
    },
    setItems(state, action) {
      state.items = action.payload;
    }
  }
});
const { selectItem, unselectItem, unselectAllItems, setItems } = selectedItemsSlice.actions;
const selectedItemsReducer = selectedItemsSlice.reducer;
const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ searchQuery, page }) => ({
        url: "people/",
        params: {
          search: searchQuery,
          page
        }
      })
    })
  })
});
const { useGetCharactersQuery } = charactersApi;
const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    selectedItems: selectedItemsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware)
});
setupListeners(store.dispatch);
function meta() {
  return [
    { title: "My Page Title" },
    { name: "description", content: "My page description" }
  ];
}
function RootLayout() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(LiveReload, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RootLayout,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function Characters() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Star Wars Characters" }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Characters
}, Symbol.toStringTag, { value: "Module" }));
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {
  }
});
const ThemeProvider = ({
  children
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { isDarkMode, toggleTheme }, children });
};
const useTheme = () => useContext(ThemeContext);
const SearchForm = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) => {
  const [hasError, setHasError] = useState(false);
  const { isDarkMode } = useTheme();
  const handleThrowError = () => {
    setHasError(true);
  };
  const resetError = () => {
    setHasError(false);
  };
  if (hasError) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "Something went wrong." }),
      /* @__PURE__ */ jsx("button", { onClick: resetError, children: "Reload Page" })
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { "data-testid": "search-form", onSubmit: onSearchSubmit, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: searchQuery,
        onChange: onSearchChange,
        placeholder: "Search characters",
        className: `${isDarkMode ? "dark-input" : "light-input"}`
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        "aria-label": "Search",
        className: `${isDarkMode ? "dark-btn" : "light-btn"}`,
        children: "Search"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        "data-testid": "throw-error-button",
        onClick: handleThrowError,
        className: `${isDarkMode ? "dark-btn" : "light-btn"}`,
        children: "Throw Error"
      }
    )
  ] });
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const { isDarkMode } = useTheme();
  return /* @__PURE__ */ jsxs("div", { className: "pagination", "data-testid": "pagination", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        "data-testid": "prev-button",
        className: `${isDarkMode ? "dark-btn" : "light-btn"}`,
        onClick: () => onPageChange(currentPage - 1),
        disabled: currentPage === 1,
        children: "Previous"
      }
    ),
    /* @__PURE__ */ jsxs("span", { children: [
      "Page ",
      currentPage,
      " of ",
      totalPages
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        "data-testid": "next-button",
        className: `${isDarkMode ? "dark-btn" : "light-btn"}`,
        onClick: () => onPageChange(currentPage + 1),
        disabled: currentPage === totalPages,
        children: "Next"
      }
    )
  ] });
};
const CharacterData = ({
  data,
  loading,
  onCharacterClick
}) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state) => state.selectedItems.items
  );
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "loading-data", children: "Loading Data..." });
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "no-data", children: "No data available" });
  }
  const handleCheckboxChange = (character, checked) => {
    if (checked) {
      dispatch(selectItem(character));
    } else {
      dispatch(unselectItem(character.name));
    }
  };
  return /* @__PURE__ */ jsx("ul", { className: "carts", "data-testid": "character-data", children: data.map((item) => /* @__PURE__ */ jsxs(
    "li",
    {
      onClick: () => onCharacterClick(item),
      className: "cart",
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: !!selectedItems[item.name],
            onChange: (e) => handleCheckboxChange(item, e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("h2", { children: item.name }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Height: ",
          item.height,
          " cm"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Mass: ",
          item.mass,
          " kg"
        ] }),
        item.hair_color ? /* @__PURE__ */ jsxs("p", { children: [
          "Hair color: ",
          item.hair_color
        ] }) : null,
        /* @__PURE__ */ jsxs("p", { children: [
          "Skin Color: ",
          item.skin_color
        ] })
      ]
    },
    item.name
  )) });
};
const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setSearchQuery(storedQuery);
    }
  }, []);
  useEffect(() => {
    return () => {
      localStorage.setItem("searchQuery", searchQuery);
    };
  }, [searchQuery]);
  return [searchQuery, setSearchQuery];
};
const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `theme-toggle-button ${isDarkMode ? "dark" : "light"}`,
      onClick: toggleTheme,
      "data-testid": "theme-toggle-button",
      children: isDarkMode ? /* @__PURE__ */ jsx(MdOutlineDarkMode, { "data-testid": "dark-mode-icon" }) : /* @__PURE__ */ jsx(MdDarkMode, { "data-testid": "light-mode-icon" })
    }
  );
};
const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state) => state.selectedItems.items
  );
  const handleUnselectAll = () => {
    Object.keys(selectedItems).forEach(() => {
      dispatch(unselectAllItems());
    });
  };
  const handleDownload = () => {
    const headers = ["Name", "Description", "Details URL"];
    const rows = Object.values(selectedItems).map((item) => [
      item.name,
      item.height || "",
      item.mass || "",
      item.hair_color || "",
      item.skin_color || "",
      item.eye_color || "",
      item.birth_year || ""
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Object.keys(selectedItems).length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flyout-container", "data-testid": "flyout", children: [
    /* @__PURE__ */ jsxs("div", { className: "selected-items", children: [
      /* @__PURE__ */ jsxs("h2", { children: [
        Object.keys(selectedItems).length,
        " item(s) selected"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleUnselectAll,
          className: "unselect-all-button",
          "data-testid": "unselect-all-button",
          children: "Unselect all"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleDownload,
          className: "download-button",
          "data-testid": "download-button",
          children: "Download"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flyout", children: [
      Object.keys(selectedItems).length === 0 && /* @__PURE__ */ jsx("p", { children: "No items selected." }),
      Object.entries(selectedItems).map(([name, character]) => /* @__PURE__ */ jsxs("div", { className: "flyout-item", children: [
        /* @__PURE__ */ jsx("h3", { children: character.name }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Height: ",
          character.height
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Mass: ",
          character.mass
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => dispatch(unselectItem(name)), children: "Remove" })
      ] }, name))
    ] })
  ] });
};
const StarWarsComponent = () => {
  const { isDarkMode } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const selectedItems = useSelector(
    (state) => state.selectedItems.items
  );
  const { data: charactersData, isLoading } = useGetCharactersQuery({
    searchQuery,
    page: currentPage
  });
  console.log(charactersData);
  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams]);
  useEffect(() => {
    dispatch(setItems(selectedItems));
  }, [dispatch, selectedItems]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const throwError = () => {
    localStorage.removeItem("searchQuery");
    throw new Error("Test error");
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearchParams({ page: "1", query: searchQuery });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: `${newPage}`, query: searchQuery });
  };
  const handleCharacterClick = (character) => {
    if (selectedItems[character.name]) {
      dispatch(unselectItem(character.name));
    } else {
      dispatch(selectItem(character));
    }
    setSearchParams({ page: `${currentPage}`, details: "1" });
  };
  return /* @__PURE__ */ jsxs("div", { className: `${isDarkMode ? "dark" : "light"}`, children: [
    /* @__PURE__ */ jsx(ThemeToggleButton, {}),
    /* @__PURE__ */ jsxs("div", { className: `container`, "data-testid": "app-container", children: [
      /* @__PURE__ */ jsx("div", { className: "top-section", children: /* @__PURE__ */ jsx(
        SearchForm,
        {
          searchQuery,
          onSearchChange: handleSearchChange,
          onSearchSubmit: handleSearchSubmit,
          throwError
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "bottom-section", children: [
        /* @__PURE__ */ jsx(
          CharacterData,
          {
            data: (charactersData == null ? void 0 : charactersData.results) || [],
            loading: isLoading,
            onCharacterClick: handleCharacterClick
          }
        ),
        /* @__PURE__ */ jsx(
          Pagination,
          {
            currentPage,
            totalPages: Math.ceil(((charactersData == null ? void 0 : charactersData.count) || 0) / 10) || 1,
            onPageChange: handlePageChange
          }
        )
      ] }),
      Object.keys(selectedItems).length > 0 && /* @__PURE__ */ jsx(Flyout, {}),
      " "
    ] })
  ] });
};
function StarWars() {
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Welcome to the Home Page" }),
    /* @__PURE__ */ jsx(StarWarsComponent, {}),
    /* @__PURE__ */ jsx(ThemeToggleButton, {})
  ] }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StarWars
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { children: "Welcome to the Star Wars Character Finder" }),
    /* @__PURE__ */ jsx(Link, { to: "/star-wars", children: "Go to Star Wars Component" })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CFinR7m3.js", "imports": ["/assets/index-CnyKaqKf.js", "/assets/index-D9_Irmw9.js", "/assets/components-DFP-gKeE.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DRKcwjTi.js", "imports": ["/assets/index-CnyKaqKf.js", "/assets/index-D9_Irmw9.js", "/assets/components-DFP-gKeE.js", "/assets/charactersApi-COnzliUl.js"], "css": ["/assets/root-BaVToMB0.css"] }, "routes/characters": { "id": "routes/characters", "parentId": "root", "path": "characters", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/characters-DTy0lumD.js", "imports": ["/assets/index-CnyKaqKf.js"], "css": [] }, "routes/star-wars": { "id": "routes/star-wars", "parentId": "root", "path": "star-wars", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/star-wars-CEVNLdg_.js", "imports": ["/assets/index-CnyKaqKf.js", "/assets/charactersApi-COnzliUl.js", "/assets/index-D9_Irmw9.js"], "css": ["/assets/star-wars-B3cwCr6M.css"] }, "routes/index": { "id": "routes/index", "parentId": "root", "path": "index", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-COT0mZm3.js", "imports": ["/assets/index-CnyKaqKf.js", "/assets/index-D9_Irmw9.js", "/assets/components-DFP-gKeE.js"], "css": [] } }, "url": "/assets/manifest-a8dc88fc.js", "version": "a8dc88fc" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/characters": {
    id: "routes/characters",
    parentId: "root",
    path: "characters",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/star-wars": {
    id: "routes/star-wars",
    parentId: "root",
    path: "star-wars",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
