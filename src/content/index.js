var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
(function() {
  "use strict";
  var _anchor, _hydrate_open, _props, _children, _effect, _main_effect, _pending_effect, _failed_effect, _offscreen_fragment, _local_pending_count, _pending_count, _pending_count_update_queued, _dirty_effects, _maybe_dirty_effects, _effect_pending, _effect_pending_subscriber, _Boundary_instances, hydrate_resolved_content_fn, hydrate_failed_content_fn, hydrate_pending_content_fn, render_fn, resolve_fn, run_fn, update_pending_count_fn, handle_error_fn, _started, _prev, _next, _commit_callbacks, _discard_callbacks, _pending, _blocking_pending, _deferred, _roots, _new_effects, _dirty_effects2, _maybe_dirty_effects2, _skipped_branches, _unskipped_branches, _decrement_queued, _Batch_instances, is_deferred_fn, process_fn, traverse_fn, find_earlier_batch_fn, merge_fn, defer_effects_fn, commit_fn, unlink_fn, _a, _batches, _onscreen, _offscreen, _outroing, _transition, _commit, _discard, _b;
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var browserPolyfill = { exports: {} };
  (function(module, exports) {
    (function(global2, factory) {
      {
        factory(module);
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) {
        throw new Error("This script should only be loaded in a browser extension.");
      }
      if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const wrapAPIs = (extensionAPIs) => {
          const apiMetadata = {
            "alarms": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "clearAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "bookmarks": {
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getChildren": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getRecent": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getSubTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTree": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "browserAction": {
              "disable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "enable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "getBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getBadgeText": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "openPopup": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setBadgeText": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "browsingData": {
              "remove": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "removeCache": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCookies": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeDownloads": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFormData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeHistory": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeLocalStorage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePasswords": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePluginData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "settings": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "commands": {
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "contextMenus": {
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "cookies": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAllCookieStores": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "devtools": {
              "inspectedWindow": {
                "eval": {
                  "minArgs": 1,
                  "maxArgs": 2,
                  "singleCallbackArg": false
                }
              },
              "panels": {
                "create": {
                  "minArgs": 3,
                  "maxArgs": 3,
                  "singleCallbackArg": true
                },
                "elements": {
                  "createSidebarPane": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              }
            },
            "downloads": {
              "cancel": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "download": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "erase": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFileIcon": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "open": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "pause": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFile": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "resume": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "extension": {
              "isAllowedFileSchemeAccess": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "isAllowedIncognitoAccess": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "history": {
              "addUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "deleteRange": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getVisits": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "i18n": {
              "detectLanguage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAcceptLanguages": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "identity": {
              "launchWebAuthFlow": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "idle": {
              "queryState": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "management": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getSelf": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setEnabled": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "uninstallSelf": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "notifications": {
              "clear": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPermissionLevel": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "pageAction": {
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "hide": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "permissions": {
              "contains": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "request": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "runtime": {
              "getBackgroundPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPlatformInfo": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "openOptionsPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "requestUpdateCheck": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "sendMessage": {
                "minArgs": 1,
                "maxArgs": 3
              },
              "sendNativeMessage": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "setUninstallURL": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "sessions": {
              "getDevices": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getRecentlyClosed": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "restore": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "storage": {
              "local": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "managed": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "sync": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            },
            "tabs": {
              "captureVisibleTab": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "detectLanguage": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "discard": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "duplicate": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "executeScript": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getZoom": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getZoomSettings": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goBack": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goForward": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "highlight": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "insertCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "query": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "reload": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "sendMessage": {
                "minArgs": 2,
                "maxArgs": 3
              },
              "setZoom": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "setZoomSettings": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "update": {
                "minArgs": 1,
                "maxArgs": 2
              }
            },
            "topSites": {
              "get": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "webNavigation": {
              "getAllFrames": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFrame": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "webRequest": {
              "handlerBehaviorChanged": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "windows": {
              "create": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getLastFocused": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            }
          };
          if (Object.keys(apiMetadata).length === 0) {
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          }
          class DefaultWeakMap extends WeakMap {
            constructor(createItem, items = void 0) {
              super(items);
              this.createItem = createItem;
            }
            get(key) {
              if (!this.has(key)) {
                this.set(key, this.createItem(key));
              }
              return super.get(key);
            }
          }
          const isThenable = (value) => {
            return value && typeof value === "object" && typeof value.then === "function";
          };
          const makeCallback = (promise, metadata) => {
            return (...callbackArgs) => {
              if (extensionAPIs.runtime.lastError) {
                promise.reject(new Error(extensionAPIs.runtime.lastError.message));
              } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                promise.resolve(callbackArgs[0]);
              } else {
                promise.resolve(callbackArgs);
              }
            };
          };
          const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
          const wrapAsyncFunction = (name, metadata) => {
            return function asyncFunctionWrapper(target, ...args) {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                if (metadata.fallbackToNoCallback) {
                  try {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  } catch (cbError) {
                    console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                    target[name](...args);
                    metadata.fallbackToNoCallback = false;
                    metadata.noCallback = true;
                    resolve();
                  }
                } else if (metadata.noCallback) {
                  target[name](...args);
                  resolve();
                } else {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                }
              });
            };
          };
          const wrapMethod = (target, method, wrapper) => {
            return new Proxy(method, {
              apply(targetMethod, thisObj, args) {
                return wrapper.call(thisObj, target, ...args);
              }
            });
          };
          let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
          const wrapObject = (target, wrappers = {}, metadata = {}) => {
            let cache = /* @__PURE__ */ Object.create(null);
            let handlers = {
              has(proxyTarget2, prop2) {
                return prop2 in target || prop2 in cache;
              },
              get(proxyTarget2, prop2, receiver) {
                if (prop2 in cache) {
                  return cache[prop2];
                }
                if (!(prop2 in target)) {
                  return void 0;
                }
                let value = target[prop2];
                if (typeof value === "function") {
                  if (typeof wrappers[prop2] === "function") {
                    value = wrapMethod(target, target[prop2], wrappers[prop2]);
                  } else if (hasOwnProperty(metadata, prop2)) {
                    let wrapper = wrapAsyncFunction(prop2, metadata[prop2]);
                    value = wrapMethod(target, target[prop2], wrapper);
                  } else {
                    value = value.bind(target);
                  }
                } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop2) || hasOwnProperty(metadata, prop2))) {
                  value = wrapObject(value, wrappers[prop2], metadata[prop2]);
                } else if (hasOwnProperty(metadata, "*")) {
                  value = wrapObject(value, wrappers[prop2], metadata["*"]);
                } else {
                  Object.defineProperty(cache, prop2, {
                    configurable: true,
                    enumerable: true,
                    get() {
                      return target[prop2];
                    },
                    set(value2) {
                      target[prop2] = value2;
                    }
                  });
                  return value;
                }
                cache[prop2] = value;
                return value;
              },
              set(proxyTarget2, prop2, value, receiver) {
                if (prop2 in cache) {
                  cache[prop2] = value;
                } else {
                  target[prop2] = value;
                }
                return true;
              },
              defineProperty(proxyTarget2, prop2, desc) {
                return Reflect.defineProperty(cache, prop2, desc);
              },
              deleteProperty(proxyTarget2, prop2) {
                return Reflect.deleteProperty(cache, prop2);
              }
            };
            let proxyTarget = Object.create(target);
            return new Proxy(proxyTarget, handlers);
          };
          const wrapEvent = (wrapperMap) => ({
            addListener(target, listener, ...args) {
              target.addListener(wrapperMap.get(listener), ...args);
            },
            hasListener(target, listener) {
              return target.hasListener(wrapperMap.get(listener));
            },
            removeListener(target, listener) {
              target.removeListener(wrapperMap.get(listener));
            }
          });
          const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onRequestFinished(req) {
              const wrappedReq = wrapObject(req, {}, {
                getContent: {
                  minArgs: 0,
                  maxArgs: 0
                }
              });
              listener(wrappedReq);
            };
          });
          const onMessageWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onMessage(message, sender, sendResponse) {
              let didCallSendResponse = false;
              let wrappedSendResponse;
              let sendResponsePromise = new Promise((resolve) => {
                wrappedSendResponse = function(response) {
                  didCallSendResponse = true;
                  resolve(response);
                };
              });
              let result;
              try {
                result = listener(message, sender, wrappedSendResponse);
              } catch (err) {
                result = Promise.reject(err);
              }
              const isResultThenable = result !== true && isThenable(result);
              if (result !== true && !isResultThenable && !didCallSendResponse) {
                return false;
              }
              const sendPromisedResult = (promise) => {
                promise.then((msg) => {
                  sendResponse(msg);
                }, (error) => {
                  let message2;
                  if (error && (error instanceof Error || typeof error.message === "string")) {
                    message2 = error.message;
                  } else {
                    message2 = "An unexpected error occurred";
                  }
                  sendResponse({
                    __mozWebExtensionPolyfillReject__: true,
                    message: message2
                  });
                }).catch((err) => {
                  console.error("Failed to send onMessage rejected reply", err);
                });
              };
              if (isResultThenable) {
                sendPromisedResult(result);
              } else {
                sendPromisedResult(sendResponsePromise);
              }
              return true;
            };
          });
          const wrappedSendMessageCallback = ({
            reject,
            resolve
          }, reply) => {
            if (extensionAPIs.runtime.lastError) {
              if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                resolve();
              } else {
                reject(new Error(extensionAPIs.runtime.lastError.message));
              }
            } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
              reject(new Error(reply.message));
            } else {
              resolve(reply);
            }
          };
          const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              const wrappedCb = wrappedSendMessageCallback.bind(null, {
                resolve,
                reject
              });
              args.push(wrappedCb);
              apiNamespaceObj.sendMessage(...args);
            });
          };
          const staticWrappers = {
            devtools: {
              network: {
                onRequestFinished: wrapEvent(onRequestFinishedWrappers)
              }
            },
            runtime: {
              onMessage: wrapEvent(onMessageWrappers),
              onMessageExternal: wrapEvent(onMessageWrappers),
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          };
          const settingMetadata = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          apiMetadata.privacy = {
            network: {
              "*": settingMetadata
            },
            services: {
              "*": settingMetadata
            },
            websites: {
              "*": settingMetadata
            }
          };
          return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };
        module2.exports = wrapAPIs(chrome);
      } else {
        module2.exports = globalThis.browser;
      }
    });
  })(browserPolyfill);
  var browserPolyfillExports = browserPolyfill.exports;
  const browser = /* @__PURE__ */ getDefaultExportFromCjs(browserPolyfillExports);
  const DEV = false;
  var is_array = Array.isArray;
  var index_of = Array.prototype.indexOf;
  var includes = Array.prototype.includes;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var object_prototype = Object.prototype;
  var array_prototype = Array.prototype;
  var get_prototype_of = Object.getPrototypeOf;
  var is_extensible = Object.isExtensible;
  const noop = () => {
  };
  function run(fn) {
    return fn();
  }
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  function deferred() {
    var resolve;
    var reject;
    var promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const MANAGED_EFFECT = 1 << 24;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const BOUNDARY_EFFECT = 1 << 7;
  const CONNECTED = 1 << 9;
  const CLEAN = 1 << 10;
  const DIRTY = 1 << 11;
  const MAYBE_DIRTY = 1 << 12;
  const INERT = 1 << 13;
  const DESTROYED = 1 << 14;
  const REACTION_RAN = 1 << 15;
  const DESTROYING = 1 << 25;
  const EFFECT_TRANSPARENT = 1 << 16;
  const EAGER_EFFECT = 1 << 17;
  const HEAD_EFFECT = 1 << 18;
  const EFFECT_PRESERVED = 1 << 19;
  const USER_EFFECT = 1 << 20;
  const EFFECT_OFFSCREEN = 1 << 25;
  const WAS_MARKED = 1 << 16;
  const REACTION_IS_UPDATING = 1 << 21;
  const ASYNC = 1 << 22;
  const ERROR_VALUE = 1 << 23;
  const STATE_SYMBOL = Symbol("$state");
  const LEGACY_PROPS = Symbol("legacy props");
  const LOADING_ATTR_SYMBOL = Symbol("");
  const ATTRIBUTES_CACHE = Symbol("attributes");
  const CLASS_CACHE = Symbol("class");
  const STYLE_CACHE = Symbol("style");
  const TEXT_CACHE = Symbol("text");
  const FORM_RESET_HANDLER = Symbol("form reset");
  const STALE_REACTION = new class StaleReactionError extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, "name", "StaleReactionError");
      __publicField(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
    }
  }();
  function async_derived_orphan() {
    {
      throw new Error(`https://svelte.dev/e/async_derived_orphan`);
    }
  }
  function each_key_duplicate(a, b, value) {
    {
      throw new Error(`https://svelte.dev/e/each_key_duplicate`);
    }
  }
  function effect_in_teardown(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_in_teardown`);
    }
  }
  function effect_in_unowned_derived() {
    {
      throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
    }
  }
  function effect_orphan(rune) {
    {
      throw new Error(`https://svelte.dev/e/effect_orphan`);
    }
  }
  function effect_update_depth_exceeded() {
    {
      throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
    }
  }
  function props_invalid_value(key) {
    {
      throw new Error(`https://svelte.dev/e/props_invalid_value`);
    }
  }
  function state_descriptors_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
    }
  }
  function state_prototype_fixed() {
    {
      throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
    }
  }
  function state_unsafe_mutation() {
    {
      throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
    }
  }
  function svelte_boundary_reset_onerror() {
    {
      throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
    }
  }
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_IS_CONTROLLED = 1 << 2;
  const EACH_IS_ANIMATED = 1 << 3;
  const EACH_ITEM_IMMUTABLE = 1 << 4;
  const PROPS_IS_IMMUTABLE = 1;
  const PROPS_IS_RUNES = 1 << 1;
  const PROPS_IS_UPDATED = 1 << 2;
  const PROPS_IS_BINDABLE = 1 << 3;
  const PROPS_IS_LAZY_INITIAL = 1 << 4;
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const UNINITIALIZED = Symbol("uninitialized");
  const NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
  const NAMESPACE_SVG = "http://www.w3.org/2000/svg";
  const NAMESPACE_MATHML = "http://www.w3.org/1998/Math/MathML";
  function derived_inert() {
    {
      console.warn(`https://svelte.dev/e/derived_inert`);
    }
  }
  function select_multiple_invalid_value() {
    {
      console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
    }
  }
  function svelte_boundary_reset_noop() {
    {
      console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
    }
  }
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  let legacy_mode_flag = false;
  let tracing_mode_flag = false;
  function enable_legacy_mode_flag() {
    legacy_mode_flag = true;
  }
  let component_context = null;
  function set_component_context(context) {
    component_context = context;
  }
  function push(props, runes = false, fn) {
    component_context = {
      p: component_context,
      i: false,
      c: null,
      e: null,
      s: props,
      x: null,
      r: (
        /** @type {Effect} */
        active_effect
      ),
      l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
    };
  }
  function pop(component) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    var effects = context.e;
    if (effects !== null) {
      context.e = null;
      for (var fn of effects) {
        create_user_effect(fn);
      }
    }
    if (component !== void 0) {
      context.x = component;
    }
    context.i = true;
    component_context = context.p;
    return component ?? /** @type {T} */
    {};
  }
  function is_runes() {
    return !legacy_mode_flag || component_context !== null && component_context.l === null;
  }
  let micro_tasks = [];
  function run_micro_tasks() {
    var tasks = micro_tasks;
    micro_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (micro_tasks.length === 0 && !is_flushing_sync) {
      var tasks = micro_tasks;
      queueMicrotask(() => {
        if (tasks === micro_tasks) run_micro_tasks();
      });
    }
    micro_tasks.push(fn);
  }
  function flush_tasks() {
    while (micro_tasks.length > 0) {
      run_micro_tasks();
    }
  }
  function handle_error(error) {
    var effect2 = active_effect;
    if (effect2 === null) {
      active_reaction.f |= ERROR_VALUE;
      return error;
    }
    if ((effect2.f & REACTION_RAN) === 0 && (effect2.f & EFFECT) === 0) {
      throw error;
    }
    invoke_error_boundary(error, effect2);
  }
  function invoke_error_boundary(error, effect2) {
    if (effect2 !== null && (effect2.f & DESTROYED) !== 0) {
      return;
    }
    while (effect2 !== null) {
      if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
        if ((effect2.f & REACTION_RAN) === 0) {
          throw error;
        }
        try {
          effect2.b.error(error);
          return;
        } catch (e) {
          error = e;
        }
      }
      effect2 = effect2.parent;
    }
    throw error;
  }
  const STATUS_MASK = -7169;
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function update_derived_status(derived2) {
    if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
      set_signal_status(derived2, CLEAN);
    } else {
      set_signal_status(derived2, MAYBE_DIRTY);
    }
  }
  function clear_marked(deps) {
    if (deps === null) return;
    for (const dep of deps) {
      if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
        continue;
      }
      dep.f ^= WAS_MARKED;
      clear_marked(
        /** @type {Derived} */
        dep.deps
      );
    }
  }
  function defer_effect(effect2, dirty_effects, maybe_dirty_effects) {
    if ((effect2.f & DIRTY) !== 0) {
      dirty_effects.add(effect2);
    } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
      maybe_dirty_effects.add(effect2);
    }
    clear_marked(effect2.deps);
    set_signal_status(effect2, CLEAN);
  }
  let is_store_binding = false;
  function capture_store_binding(fn) {
    var previous_is_store_binding = is_store_binding;
    try {
      is_store_binding = false;
      return [fn(), is_store_binding];
    } finally {
      is_store_binding = previous_is_store_binding;
    }
  }
  function createSubscriber(start) {
    let subscribers = 0;
    let version = source(0);
    let stop;
    return () => {
      if (effect_tracking()) {
        get(version);
        render_effect(() => {
          if (subscribers === 0) {
            stop = untrack(() => start(() => increment(version)));
          }
          subscribers += 1;
          return () => {
            queue_micro_task(() => {
              subscribers -= 1;
              if (subscribers === 0) {
                stop == null ? void 0 : stop();
                stop = void 0;
                increment(version);
              }
            });
          };
        });
      }
    };
  }
  var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
  function boundary(node, props, children, transform_error) {
    new Boundary(node, props, children, transform_error);
  }
  class Boundary {
    /**
     * @param {TemplateNode} node
     * @param {BoundaryProps} props
     * @param {((anchor: Node) => void)} children
     * @param {((error: unknown) => unknown) | undefined} [transform_error]
     */
    constructor(node, props, children, transform_error) {
      __privateAdd(this, _Boundary_instances);
      /** @type {Boundary | null} */
      __publicField(this, "parent");
      __publicField(this, "is_pending", false);
      /**
       * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
       * Inherited from parent boundary, or defaults to identity.
       * @type {(error: unknown) => unknown}
       */
      __publicField(this, "transform_error");
      /** @type {TemplateNode} */
      __privateAdd(this, _anchor);
      /** @type {TemplateNode | null} */
      __privateAdd(this, _hydrate_open, null);
      /** @type {BoundaryProps} */
      __privateAdd(this, _props);
      /** @type {((anchor: Node) => void)} */
      __privateAdd(this, _children);
      /** @type {Effect} */
      __privateAdd(this, _effect);
      /** @type {Effect | null} */
      __privateAdd(this, _main_effect, null);
      /** @type {Effect | null} */
      __privateAdd(this, _pending_effect, null);
      /** @type {Effect | null} */
      __privateAdd(this, _failed_effect, null);
      /** @type {DocumentFragment | null} */
      __privateAdd(this, _offscreen_fragment, null);
      __privateAdd(this, _local_pending_count, 0);
      __privateAdd(this, _pending_count, 0);
      __privateAdd(this, _pending_count_update_queued, false);
      /** @type {Set<Effect>} */
      __privateAdd(this, _dirty_effects, /* @__PURE__ */ new Set());
      /** @type {Set<Effect>} */
      __privateAdd(this, _maybe_dirty_effects, /* @__PURE__ */ new Set());
      /**
       * A source containing the number of pending async deriveds/expressions.
       * Only created if `$effect.pending()` is used inside the boundary,
       * otherwise updating the source results in needless `Batch.ensure()`
       * calls followed by no-op flushes
       * @type {Source<number> | null}
       */
      __privateAdd(this, _effect_pending, null);
      __privateAdd(this, _effect_pending_subscriber, createSubscriber(() => {
        __privateSet(this, _effect_pending, source(__privateGet(this, _local_pending_count)));
        return () => {
          __privateSet(this, _effect_pending, null);
        };
      }));
      var _a2;
      __privateSet(this, _anchor, node);
      __privateSet(this, _props, props);
      __privateSet(this, _children, (anchor) => {
        var effect2 = (
          /** @type {Effect} */
          active_effect
        );
        effect2.b = this;
        effect2.f |= BOUNDARY_EFFECT;
        children(anchor);
      });
      this.parent = /** @type {Effect} */
      active_effect.b;
      this.transform_error = transform_error ?? ((_a2 = this.parent) == null ? void 0 : _a2.transform_error) ?? ((e) => e);
      __privateSet(this, _effect, block(() => {
        {
          __privateMethod(this, _Boundary_instances, render_fn).call(this);
        }
      }, flags));
    }
    /**
     * Defer an effect inside a pending boundary until the boundary resolves
     * @param {Effect} effect
     */
    defer_effect(effect2) {
      defer_effect(effect2, __privateGet(this, _dirty_effects), __privateGet(this, _maybe_dirty_effects));
    }
    /**
     * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
     * @returns {boolean}
     */
    is_rendered() {
      return !this.is_pending && (!this.parent || this.parent.is_rendered());
    }
    has_pending_snippet() {
      return !!__privateGet(this, _props).pending;
    }
    /**
     * Update the source that powers `$effect.pending()` inside this boundary,
     * and controls when the current `pending` snippet (if any) is removed.
     * Do not call from inside the class
     * @param {1 | -1} d
     * @param {Batch} batch
     */
    update_pending_count(d, batch) {
      __privateMethod(this, _Boundary_instances, update_pending_count_fn).call(this, d, batch);
      __privateSet(this, _local_pending_count, __privateGet(this, _local_pending_count) + d);
      if (!__privateGet(this, _effect_pending) || __privateGet(this, _pending_count_update_queued)) return;
      __privateSet(this, _pending_count_update_queued, true);
      queue_micro_task(() => {
        __privateSet(this, _pending_count_update_queued, false);
        if (__privateGet(this, _effect_pending)) {
          internal_set(__privateGet(this, _effect_pending), __privateGet(this, _local_pending_count));
        }
      });
    }
    get_effect_pending() {
      __privateGet(this, _effect_pending_subscriber).call(this);
      return get(
        /** @type {Source<number>} */
        __privateGet(this, _effect_pending)
      );
    }
    /** @param {unknown} error */
    error(error) {
      if (!__privateGet(this, _props).onerror && !__privateGet(this, _props).failed) {
        throw error;
      }
      if (current_batch == null ? void 0 : current_batch.is_fork) {
        if (__privateGet(this, _main_effect)) current_batch.skip_effect(__privateGet(this, _main_effect));
        if (__privateGet(this, _pending_effect)) current_batch.skip_effect(__privateGet(this, _pending_effect));
        if (__privateGet(this, _failed_effect)) current_batch.skip_effect(__privateGet(this, _failed_effect));
        current_batch.oncommit(() => {
          __privateMethod(this, _Boundary_instances, handle_error_fn).call(this, error);
        });
      } else {
        __privateMethod(this, _Boundary_instances, handle_error_fn).call(this, error);
      }
    }
  }
  _anchor = new WeakMap();
  _hydrate_open = new WeakMap();
  _props = new WeakMap();
  _children = new WeakMap();
  _effect = new WeakMap();
  _main_effect = new WeakMap();
  _pending_effect = new WeakMap();
  _failed_effect = new WeakMap();
  _offscreen_fragment = new WeakMap();
  _local_pending_count = new WeakMap();
  _pending_count = new WeakMap();
  _pending_count_update_queued = new WeakMap();
  _dirty_effects = new WeakMap();
  _maybe_dirty_effects = new WeakMap();
  _effect_pending = new WeakMap();
  _effect_pending_subscriber = new WeakMap();
  _Boundary_instances = new WeakSet();
  hydrate_resolved_content_fn = function() {
    try {
      __privateSet(this, _main_effect, branch(() => __privateGet(this, _children).call(this, __privateGet(this, _anchor))));
    } catch (error) {
      this.error(error);
    }
  };
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  hydrate_failed_content_fn = function(error) {
    const failed = __privateGet(this, _props).failed;
    if (!failed) return;
    __privateSet(this, _failed_effect, branch(() => {
      failed(
        __privateGet(this, _anchor),
        () => error,
        () => () => {
        }
      );
    }));
  };
  hydrate_pending_content_fn = function() {
    const pending = __privateGet(this, _props).pending;
    if (!pending) return;
    this.is_pending = true;
    __privateSet(this, _pending_effect, branch(() => pending(__privateGet(this, _anchor))));
    queue_micro_task(() => {
      var fragment = __privateSet(this, _offscreen_fragment, document.createDocumentFragment());
      var anchor = create_text();
      fragment.append(anchor);
      __privateSet(this, _main_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
        return branch(() => __privateGet(this, _children).call(this, anchor));
      }));
      if (__privateGet(this, _pending_count) === 0) {
        __privateGet(this, _anchor).before(fragment);
        __privateSet(this, _offscreen_fragment, null);
        pause_effect(
          /** @type {Effect} */
          __privateGet(this, _pending_effect),
          () => {
            __privateSet(this, _pending_effect, null);
          }
        );
        __privateMethod(this, _Boundary_instances, resolve_fn).call(
          this,
          /** @type {Batch} */
          current_batch
        );
      }
    });
  };
  render_fn = function() {
    try {
      this.is_pending = this.has_pending_snippet();
      __privateSet(this, _pending_count, 0);
      __privateSet(this, _local_pending_count, 0);
      __privateSet(this, _main_effect, branch(() => {
        __privateGet(this, _children).call(this, __privateGet(this, _anchor));
      }));
      if (__privateGet(this, _pending_count) > 0) {
        var fragment = __privateSet(this, _offscreen_fragment, document.createDocumentFragment());
        move_effect(__privateGet(this, _main_effect), fragment);
        const pending = (
          /** @type {(anchor: Node) => void} */
          __privateGet(this, _props).pending
        );
        __privateSet(this, _pending_effect, branch(() => pending(__privateGet(this, _anchor))));
      } else {
        __privateMethod(this, _Boundary_instances, resolve_fn).call(
          this,
          /** @type {Batch} */
          current_batch
        );
      }
    } catch (error) {
      this.error(error);
    }
  };
  /**
   * @param {Batch} batch
   */
  resolve_fn = function(batch) {
    this.is_pending = false;
    batch.transfer_effects(__privateGet(this, _dirty_effects), __privateGet(this, _maybe_dirty_effects));
  };
  /**
   * @template T
   * @param {() => T} fn
   */
  run_fn = function(fn) {
    var previous_effect = active_effect;
    var previous_reaction = active_reaction;
    var previous_ctx = component_context;
    set_active_effect(__privateGet(this, _effect));
    set_active_reaction(__privateGet(this, _effect));
    set_component_context(__privateGet(this, _effect).ctx);
    try {
      Batch.ensure();
      return fn();
    } catch (e) {
      handle_error(e);
      return null;
    } finally {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_ctx);
    }
  };
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count_fn = function(d, batch) {
    var _a2;
    if (!this.has_pending_snippet()) {
      if (this.parent) {
        __privateMethod(_a2 = this.parent, _Boundary_instances, update_pending_count_fn).call(_a2, d, batch);
      }
      return;
    }
    __privateSet(this, _pending_count, __privateGet(this, _pending_count) + d);
    if (__privateGet(this, _pending_count) === 0) {
      __privateMethod(this, _Boundary_instances, resolve_fn).call(this, batch);
      if (__privateGet(this, _pending_effect)) {
        pause_effect(__privateGet(this, _pending_effect), () => {
          __privateSet(this, _pending_effect, null);
        });
      }
      if (__privateGet(this, _offscreen_fragment)) {
        __privateGet(this, _anchor).before(__privateGet(this, _offscreen_fragment));
        __privateSet(this, _offscreen_fragment, null);
      }
    }
  };
  /**
   * @param {unknown} error
   */
  handle_error_fn = function(error) {
    if (__privateGet(this, _main_effect)) {
      destroy_effect(__privateGet(this, _main_effect));
      __privateSet(this, _main_effect, null);
    }
    if (__privateGet(this, _pending_effect)) {
      destroy_effect(__privateGet(this, _pending_effect));
      __privateSet(this, _pending_effect, null);
    }
    if (__privateGet(this, _failed_effect)) {
      destroy_effect(__privateGet(this, _failed_effect));
      __privateSet(this, _failed_effect, null);
    }
    var onerror = __privateGet(this, _props).onerror;
    let failed = __privateGet(this, _props).failed;
    var did_reset = false;
    var calling_on_error = false;
    const reset = () => {
      if (did_reset) {
        svelte_boundary_reset_noop();
        return;
      }
      did_reset = true;
      if (calling_on_error) {
        svelte_boundary_reset_onerror();
      }
      if (__privateGet(this, _failed_effect) !== null) {
        pause_effect(__privateGet(this, _failed_effect), () => {
          __privateSet(this, _failed_effect, null);
        });
      }
      __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
        __privateMethod(this, _Boundary_instances, render_fn).call(this);
      });
    };
    const handle_error_result = (transformed_error) => {
      try {
        calling_on_error = true;
        onerror == null ? void 0 : onerror(transformed_error, reset);
        calling_on_error = false;
      } catch (error2) {
        invoke_error_boundary(error2, __privateGet(this, _effect) && __privateGet(this, _effect).parent);
      }
      if (failed) {
        __privateSet(this, _failed_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
          try {
            return branch(() => {
              var effect2 = (
                /** @type {Effect} */
                active_effect
              );
              effect2.b = this;
              effect2.f |= BOUNDARY_EFFECT;
              failed(
                __privateGet(this, _anchor),
                () => transformed_error,
                () => reset
              );
            });
          } catch (error2) {
            invoke_error_boundary(
              error2,
              /** @type {Effect} */
              __privateGet(this, _effect).parent
            );
            return null;
          }
        }));
      }
    };
    queue_micro_task(() => {
      var result;
      try {
        result = this.transform_error(error);
      } catch (e) {
        invoke_error_boundary(e, __privateGet(this, _effect) && __privateGet(this, _effect).parent);
        return;
      }
      if (result !== null && typeof result === "object" && typeof /** @type {any} */
      result.then === "function") {
        result.then(
          handle_error_result,
          /** @param {unknown} e */
          (e) => invoke_error_boundary(e, __privateGet(this, _effect) && __privateGet(this, _effect).parent)
        );
      } else {
        handle_error_result(result);
      }
    });
  };
  function flatten(blockers, sync, async, fn) {
    const d = is_runes() ? derived : derived_safe_equal;
    var pending = blockers.filter((b) => !b.settled);
    var deriveds = sync.map(d);
    if (async.length === 0 && pending.length === 0) {
      fn(deriveds);
      return;
    }
    var parent = (
      /** @type {Effect} */
      active_effect
    );
    var restore = capture();
    var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
    function finish(async2) {
      if ((parent.f & DESTROYED) !== 0) {
        return;
      }
      restore();
      try {
        fn([...deriveds, ...async2]);
      } catch (error) {
        invoke_error_boundary(error, parent);
      }
      unset_context();
    }
    var decrement_pending = increment_pending();
    if (async.length === 0) {
      blocker_promise.then(() => finish([])).finally(decrement_pending);
      return;
    }
    function run2() {
      Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
    }
    if (blocker_promise) {
      blocker_promise.then(() => {
        restore();
        run2();
        unset_context();
      });
    } else {
      run2();
    }
  }
  function capture() {
    var previous_effect = (
      /** @type {Effect} */
      active_effect
    );
    var previous_reaction = active_reaction;
    var previous_component_context = component_context;
    var previous_batch2 = (
      /** @type {Batch} */
      current_batch
    );
    return function restore(activate_batch = true) {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_component_context);
      if (activate_batch && (previous_effect.f & DESTROYED) === 0) {
        previous_batch2 == null ? void 0 : previous_batch2.activate();
        previous_batch2 == null ? void 0 : previous_batch2.apply();
      }
    };
  }
  function unset_context(deactivate_batch = true) {
    set_active_effect(null);
    set_active_reaction(null);
    set_component_context(null);
    if (deactivate_batch) current_batch == null ? void 0 : current_batch.deactivate();
  }
  function increment_pending() {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    var boundary2 = effect2.b;
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var blocking = !!(boundary2 == null ? void 0 : boundary2.is_rendered());
    boundary2 == null ? void 0 : boundary2.update_pending_count(1, batch);
    batch.increment(blocking, effect2);
    return () => {
      boundary2 == null ? void 0 : boundary2.update_pending_count(-1, batch);
      batch.decrement(blocking, effect2);
    };
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    var flags2 = DERIVED | DIRTY;
    if (active_effect !== null) {
      active_effect.f |= EFFECT_PRESERVED;
    }
    const signal = {
      ctx: component_context,
      deps: null,
      effects: null,
      equals,
      f: flags2,
      fn,
      reactions: null,
      rv: 0,
      v: (
        /** @type {V} */
        UNINITIALIZED
      ),
      wv: 0,
      parent: active_effect,
      ac: null
    };
    return signal;
  }
  const OBSOLETE = Symbol("obsolete");
  // @__NO_SIDE_EFFECTS__
  function async_derived(fn, label, location) {
    let parent = (
      /** @type {Effect | null} */
      active_effect
    );
    if (parent === null) {
      async_derived_orphan();
    }
    var promise = (
      /** @type {Promise<V>} */
      /** @type {unknown} */
      void 0
    );
    var signal = source(
      /** @type {V} */
      UNINITIALIZED
    );
    var should_suspend = !active_reaction;
    var deferreds = /* @__PURE__ */ new Set();
    async_effect(() => {
      var _a2, _b2;
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      var d = deferred();
      promise = d.promise;
      try {
        Promise.resolve(fn()).then(d.resolve, (e) => {
          if (e !== STALE_REACTION) d.reject(e);
        }).finally(unset_context);
      } catch (error) {
        d.reject(error);
        unset_context();
      }
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      if (should_suspend) {
        if ((effect2.f & REACTION_RAN) !== 0) {
          var decrement_pending = increment_pending();
        }
        if (
          // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
          (_a2 = parent.b) == null ? void 0 : _a2.is_rendered()
        ) {
          (_b2 = batch.async_deriveds.get(effect2)) == null ? void 0 : _b2.reject(OBSOLETE);
        } else {
          for (const d2 of deferreds.values()) {
            d2.reject(OBSOLETE);
          }
        }
        deferreds.add(d);
        batch.async_deriveds.set(effect2, d);
      }
      const handler = (value, error = void 0) => {
        decrement_pending == null ? void 0 : decrement_pending();
        deferreds.delete(d);
        if (error === OBSOLETE) return;
        batch.activate();
        if (error) {
          signal.f |= ERROR_VALUE;
          internal_set(signal, error);
        } else {
          if ((signal.f & ERROR_VALUE) !== 0) {
            signal.f ^= ERROR_VALUE;
          }
          internal_set(signal, value);
        }
        batch.deactivate();
      };
      d.promise.then(handler, (e) => handler(null, e || "unknown"));
    });
    teardown(() => {
      for (const d of deferreds) {
        d.reject(OBSOLETE);
      }
    });
    return new Promise((fulfil) => {
      function next(p) {
        function go() {
          if (p === promise) {
            fulfil(signal);
          } else {
            next(promise);
          }
        }
        p.then(go, go);
      }
      next(promise);
    });
  }
  // @__NO_SIDE_EFFECTS__
  function user_derived(fn) {
    const d = /* @__PURE__ */ derived(fn);
    push_reaction_value(d);
    return d;
  }
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
    return signal;
  }
  function destroy_derived_effects(derived2) {
    var effects = derived2.effects;
    if (effects !== null) {
      derived2.effects = null;
      for (var i = 0; i < effects.length; i += 1) {
        destroy_effect(
          /** @type {Effect} */
          effects[i]
        );
      }
    }
  }
  function execute_derived(derived2) {
    var value;
    var prev_active_effect = active_effect;
    var parent = derived2.parent;
    if (!is_destroying_effect && parent !== null && derived2.v !== UNINITIALIZED && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
    (parent.f & (DESTROYED | INERT)) !== 0) {
      derived_inert();
      return derived2.v;
    }
    set_active_effect(parent);
    {
      try {
        derived2.f &= ~WAS_MARKED;
        destroy_derived_effects(derived2);
        value = update_reaction(derived2);
      } finally {
        set_active_effect(prev_active_effect);
      }
    }
    return value;
  }
  function update_derived(derived2) {
    var value = execute_derived(derived2);
    if (!derived2.equals(value)) {
      derived2.wv = increment_write_version();
      if (!(current_batch == null ? void 0 : current_batch.is_fork) || derived2.deps === null) {
        if (current_batch !== null) {
          current_batch.capture(derived2, value, true);
          previous_batch == null ? void 0 : previous_batch.capture(derived2, value, true);
        } else {
          derived2.v = value;
        }
        if (derived2.deps === null) {
          set_signal_status(derived2, CLEAN);
          return;
        }
      }
    }
    if (is_destroying_effect) {
      return;
    }
    if (batch_values !== null) {
      if (effect_tracking() || (current_batch == null ? void 0 : current_batch.is_fork)) {
        batch_values.set(derived2, value);
      }
    } else {
      update_derived_status(derived2);
    }
  }
  function freeze_derived_effects(derived2) {
    var _a2, _b2;
    if (derived2.effects === null) return;
    for (const e of derived2.effects) {
      if (e.teardown || e.ac) {
        (_a2 = e.teardown) == null ? void 0 : _a2.call(e);
        (_b2 = e.ac) == null ? void 0 : _b2.abort(STALE_REACTION);
        if (e.fn !== null) e.teardown = noop;
        e.ac = null;
        remove_reactions(e, 0);
        destroy_effect_children(e);
      }
    }
  }
  function unfreeze_derived_effects(derived2) {
    if (derived2.effects === null) return;
    for (const e of derived2.effects) {
      if (e.teardown && e.fn !== null) {
        update_effect(e);
      }
    }
  }
  let first_batch = null;
  let last_batch = null;
  let current_batch = null;
  let previous_batch = null;
  let batch_values = null;
  let last_scheduled_effect = null;
  let is_flushing_sync = false;
  let is_processing = false;
  let collected_effects = null;
  let legacy_updates = null;
  var flush_count = 0;
  var source_stacks = /* @__PURE__ */ new Set();
  let uid = 1;
  const _Batch = class _Batch {
    constructor() {
      __privateAdd(this, _Batch_instances);
      __publicField(this, "id", uid++);
      /** True as soon as `#process` was called */
      __privateAdd(this, _started, false);
      __publicField(this, "linked", true);
      /** @type {Batch | null} */
      __privateAdd(this, _prev, null);
      /** @type {Batch | null} */
      __privateAdd(this, _next, null);
      /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
      __publicField(this, "async_deriveds", /* @__PURE__ */ new Map());
      /**
       * The current values of any signals that are updated in this batch.
       * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
       * They keys of this map are identical to `this.#previous`
       * @type {Map<Value, [any, boolean]>}
       */
      __publicField(this, "current", /* @__PURE__ */ new Map());
      /**
       * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
       * They keys of this map are identical to `this.#current`
       * @type {Map<Value, any>}
       */
      __publicField(this, "previous", /* @__PURE__ */ new Map());
      /**
       * When the batch is committed (and the DOM is updated), we need to remove old branches
       * and append new ones by calling the functions added inside (if/each/key/etc) blocks
       * @type {Set<(batch: Batch) => void>}
       */
      __privateAdd(this, _commit_callbacks, /* @__PURE__ */ new Set());
      /**
       * If a fork is discarded, we need to destroy any effects that are no longer needed
       * @type {Set<(batch: Batch) => void>}
       */
      __privateAdd(this, _discard_callbacks, /* @__PURE__ */ new Set());
      /**
       * The number of async effects that are currently in flight
       */
      __privateAdd(this, _pending, 0);
      /**
       * Async effects that are currently in flight, _not_ inside a pending boundary
       * @type {Map<Effect, number>}
       */
      __privateAdd(this, _blocking_pending, /* @__PURE__ */ new Map());
      /**
       * A deferred that resolves when the batch is committed, used with `settled()`
       * TODO replace with Promise.withResolvers once supported widely enough
       * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
       */
      __privateAdd(this, _deferred, null);
      /**
       * The root effects that need to be flushed
       * @type {Effect[]}
       */
      __privateAdd(this, _roots, []);
      /**
       * Effects created while this batch was active.
       * @type {Effect[]}
       */
      __privateAdd(this, _new_effects, []);
      /**
       * Deferred effects (which run after async work has completed) that are DIRTY
       * @type {Set<Effect>}
       */
      __privateAdd(this, _dirty_effects2, /* @__PURE__ */ new Set());
      /**
       * Deferred effects that are MAYBE_DIRTY
       * @type {Set<Effect>}
       */
      __privateAdd(this, _maybe_dirty_effects2, /* @__PURE__ */ new Set());
      /**
       * A map of branches that still exist, but will be destroyed when this batch
       * is committed — we skip over these during `process`.
       * The value contains child effects that were dirty/maybe_dirty before being reset,
       * so they can be rescheduled if the branch survives.
       * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
       */
      __privateAdd(this, _skipped_branches, /* @__PURE__ */ new Map());
      /**
       * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
       * @type {Set<Effect>}
       */
      __privateAdd(this, _unskipped_branches, /* @__PURE__ */ new Set());
      __publicField(this, "is_fork", false);
      __privateAdd(this, _decrement_queued, false);
      if (last_batch === null) {
        first_batch = last_batch = this;
      } else {
        __privateSet(last_batch, _next, this);
        __privateSet(this, _prev, last_batch);
      }
      last_batch = this;
    }
    /**
     * Add an effect to the #skipped_branches map and reset its children
     * @param {Effect} effect
     */
    skip_effect(effect2) {
      if (!__privateGet(this, _skipped_branches).has(effect2)) {
        __privateGet(this, _skipped_branches).set(effect2, { d: [], m: [] });
      }
      __privateGet(this, _unskipped_branches).delete(effect2);
    }
    /**
     * Remove an effect from the #skipped_branches map and reschedule
     * any tracked dirty/maybe_dirty child effects
     * @param {Effect} effect
     * @param {(e: Effect) => void} callback
     */
    unskip_effect(effect2, callback = (e) => this.schedule(e)) {
      var tracked = __privateGet(this, _skipped_branches).get(effect2);
      if (tracked) {
        __privateGet(this, _skipped_branches).delete(effect2);
        for (var e of tracked.d) {
          set_signal_status(e, DIRTY);
          callback(e);
        }
        for (e of tracked.m) {
          set_signal_status(e, MAYBE_DIRTY);
          callback(e);
        }
      }
      __privateGet(this, _unskipped_branches).add(effect2);
    }
    /**
     * Associate a change to a given source with the current
     * batch, noting its previous and current values
     * @param {Value} source
     * @param {any} value
     * @param {boolean} [is_derived]
     */
    capture(source2, value, is_derived = false) {
      if (source2.v !== UNINITIALIZED && !this.previous.has(source2)) {
        this.previous.set(source2, source2.v);
      }
      if ((source2.f & ERROR_VALUE) === 0) {
        this.current.set(source2, [value, is_derived]);
        batch_values == null ? void 0 : batch_values.set(source2, value);
      }
      if (!this.is_fork) {
        source2.v = value;
      }
    }
    activate() {
      current_batch = this;
    }
    deactivate() {
      current_batch = null;
      batch_values = null;
    }
    flush() {
      try {
        if (DEV) ;
        is_processing = true;
        current_batch = this;
        __privateMethod(this, _Batch_instances, process_fn).call(this);
      } finally {
        flush_count = 0;
        last_scheduled_effect = null;
        collected_effects = null;
        legacy_updates = null;
        is_processing = false;
        current_batch = null;
        batch_values = null;
        old_values.clear();
      }
    }
    discard() {
      var _a2;
      for (const fn of __privateGet(this, _discard_callbacks)) fn(this);
      __privateGet(this, _discard_callbacks).clear();
      for (const deferred2 of this.async_deriveds.values()) {
        deferred2.reject(OBSOLETE);
      }
      __privateMethod(this, _Batch_instances, unlink_fn).call(this);
      (_a2 = __privateGet(this, _deferred)) == null ? void 0 : _a2.resolve();
    }
    /**
     * @param {Effect} effect
     */
    register_created_effect(effect2) {
      __privateGet(this, _new_effects).push(effect2);
    }
    /**
     * @param {boolean} blocking
     * @param {Effect} effect
     */
    increment(blocking, effect2) {
      __privateSet(this, _pending, __privateGet(this, _pending) + 1);
      if (blocking) {
        let blocking_pending_count = __privateGet(this, _blocking_pending).get(effect2) ?? 0;
        __privateGet(this, _blocking_pending).set(effect2, blocking_pending_count + 1);
      }
    }
    /**
     * @param {boolean} blocking
     * @param {Effect} effect
     */
    decrement(blocking, effect2) {
      __privateSet(this, _pending, __privateGet(this, _pending) - 1);
      if (blocking) {
        let blocking_pending_count = __privateGet(this, _blocking_pending).get(effect2) ?? 0;
        if (blocking_pending_count === 1) {
          __privateGet(this, _blocking_pending).delete(effect2);
        } else {
          __privateGet(this, _blocking_pending).set(effect2, blocking_pending_count - 1);
        }
      }
      if (__privateGet(this, _decrement_queued)) return;
      __privateSet(this, _decrement_queued, true);
      queue_micro_task(() => {
        __privateSet(this, _decrement_queued, false);
        if (this.linked) {
          this.flush();
        }
      });
    }
    /**
     * @param {Set<Effect>} dirty_effects
     * @param {Set<Effect>} maybe_dirty_effects
     */
    transfer_effects(dirty_effects, maybe_dirty_effects) {
      for (const e of dirty_effects) {
        __privateGet(this, _dirty_effects2).add(e);
      }
      for (const e of maybe_dirty_effects) {
        __privateGet(this, _maybe_dirty_effects2).add(e);
      }
      dirty_effects.clear();
      maybe_dirty_effects.clear();
    }
    /** @param {(batch: Batch) => void} fn */
    oncommit(fn) {
      __privateGet(this, _commit_callbacks).add(fn);
    }
    /** @param {(batch: Batch) => void} fn */
    ondiscard(fn) {
      __privateGet(this, _discard_callbacks).add(fn);
    }
    settled() {
      return (__privateGet(this, _deferred) ?? __privateSet(this, _deferred, deferred())).promise;
    }
    static ensure() {
      if (current_batch === null) {
        const batch = current_batch = new _Batch();
        if (!is_processing && !is_flushing_sync) {
          queue_micro_task(() => {
            if (!__privateGet(batch, _started)) {
              batch.flush();
            }
          });
        }
      }
      return current_batch;
    }
    apply() {
      {
        batch_values = null;
        return;
      }
    }
    /**
     *
     * @param {Effect} effect
     */
    schedule(effect2) {
      var _a2;
      last_scheduled_effect = effect2;
      if (((_a2 = effect2.b) == null ? void 0 : _a2.is_pending) && (effect2.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (effect2.f & REACTION_RAN) === 0) {
        effect2.b.defer_effect(effect2);
        return;
      }
      var e = effect2;
      while (e.parent !== null) {
        e = e.parent;
        var flags2 = e.f;
        if (collected_effects !== null && e === active_effect) {
          if ((active_reaction === null || (active_reaction.f & DERIVED) === 0) && true) {
            return;
          }
        }
        if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
          if ((flags2 & CLEAN) === 0) {
            return;
          }
          e.f ^= CLEAN;
        }
      }
      __privateGet(this, _roots).push(e);
    }
  };
  _started = new WeakMap();
  _prev = new WeakMap();
  _next = new WeakMap();
  _commit_callbacks = new WeakMap();
  _discard_callbacks = new WeakMap();
  _pending = new WeakMap();
  _blocking_pending = new WeakMap();
  _deferred = new WeakMap();
  _roots = new WeakMap();
  _new_effects = new WeakMap();
  _dirty_effects2 = new WeakMap();
  _maybe_dirty_effects2 = new WeakMap();
  _skipped_branches = new WeakMap();
  _unskipped_branches = new WeakMap();
  _decrement_queued = new WeakMap();
  _Batch_instances = new WeakSet();
  is_deferred_fn = function() {
    if (this.is_fork) return true;
    for (const effect2 of __privateGet(this, _blocking_pending).keys()) {
      var e = effect2;
      var skipped = false;
      while (e.parent !== null) {
        if (__privateGet(this, _skipped_branches).has(e)) {
          skipped = true;
          break;
        }
        e = e.parent;
      }
      if (!skipped) {
        return true;
      }
    }
    return false;
  };
  process_fn = function() {
    var _a2, _b2, _c, _d;
    __privateSet(this, _started, true);
    if (flush_count++ > 1e3) {
      __privateMethod(this, _Batch_instances, unlink_fn).call(this);
      infinite_loop_guard();
    }
    for (const e of __privateGet(this, _dirty_effects2)) {
      __privateGet(this, _maybe_dirty_effects2).delete(e);
      set_signal_status(e, DIRTY);
      this.schedule(e);
    }
    for (const e of __privateGet(this, _maybe_dirty_effects2)) {
      set_signal_status(e, MAYBE_DIRTY);
      this.schedule(e);
    }
    const roots = __privateGet(this, _roots);
    __privateSet(this, _roots, []);
    this.apply();
    var effects = collected_effects = [];
    var render_effects = [];
    var updates = legacy_updates = [];
    for (const root2 of roots) {
      try {
        __privateMethod(this, _Batch_instances, traverse_fn).call(this, root2, effects, render_effects);
      } catch (e) {
        reset_all(root2);
        if (!__privateMethod(this, _Batch_instances, is_deferred_fn).call(this)) this.discard();
        throw e;
      }
    }
    current_batch = null;
    if (updates.length > 0) {
      var batch = _Batch.ensure();
      for (const e of updates) {
        batch.schedule(e);
      }
    }
    collected_effects = null;
    legacy_updates = null;
    if (__privateMethod(this, _Batch_instances, is_deferred_fn).call(this)) {
      __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, render_effects);
      __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, effects);
      for (const [e, t] of __privateGet(this, _skipped_branches)) {
        reset_branch(e, t);
      }
      if (updates.length > 0) {
        /** @type {unknown} */
        __privateMethod(_a2 = current_batch, _Batch_instances, process_fn).call(_a2);
      }
      return;
    }
    const earlier_batch = __privateMethod(this, _Batch_instances, find_earlier_batch_fn).call(this);
    if (earlier_batch) {
      __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, render_effects);
      __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, effects);
      __privateMethod(_b2 = earlier_batch, _Batch_instances, merge_fn).call(_b2, this);
      return;
    }
    __privateGet(this, _dirty_effects2).clear();
    __privateGet(this, _maybe_dirty_effects2).clear();
    for (const fn of __privateGet(this, _commit_callbacks)) fn(this);
    __privateGet(this, _commit_callbacks).clear();
    previous_batch = this;
    flush_queued_effects(render_effects);
    flush_queued_effects(effects);
    previous_batch = null;
    (_c = __privateGet(this, _deferred)) == null ? void 0 : _c.resolve();
    var next_batch = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      current_batch
    );
    if (__privateGet(this, _pending) === 0 && (__privateGet(this, _roots).length === 0 || next_batch !== null)) {
      __privateMethod(this, _Batch_instances, unlink_fn).call(this);
    }
    if (__privateGet(this, _roots).length > 0) {
      if (next_batch !== null) {
        const batch2 = next_batch;
        __privateGet(batch2, _roots).push(...__privateGet(this, _roots).filter((r2) => !__privateGet(batch2, _roots).includes(r2)));
      } else {
        next_batch = this;
      }
    }
    if (next_batch !== null) {
      __privateMethod(_d = next_batch, _Batch_instances, process_fn).call(_d);
    }
  };
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  traverse_fn = function(root2, effects, render_effects) {
    root2.f ^= CLEAN;
    var effect2 = root2.first;
    while (effect2 !== null) {
      var flags2 = effect2.f;
      var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
      var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
      var skip = is_skippable_branch || (flags2 & INERT) !== 0 || __privateGet(this, _skipped_branches).has(effect2);
      if (!skip && effect2.fn !== null) {
        if (is_branch) {
          effect2.f ^= CLEAN;
        } else if ((flags2 & EFFECT) !== 0) {
          effects.push(effect2);
        } else if (is_dirty(effect2)) {
          if ((flags2 & BLOCK_EFFECT) !== 0) __privateGet(this, _maybe_dirty_effects2).add(effect2);
          update_effect(effect2);
        }
        var child2 = effect2.first;
        if (child2 !== null) {
          effect2 = child2;
          continue;
        }
      }
      while (effect2 !== null) {
        var next = effect2.next;
        if (next !== null) {
          effect2 = next;
          break;
        }
        effect2 = effect2.parent;
      }
    }
  };
  find_earlier_batch_fn = function() {
    var batch = __privateGet(this, _prev);
    while (batch !== null) {
      if (!batch.is_fork) {
        for (const [value, [, is_derived]] of this.current) {
          if (batch.current.has(value) && !is_derived) {
            return batch;
          }
        }
      }
      batch = __privateGet(batch, _prev);
    }
    return null;
  };
  /**
   * @param {Batch} batch
   */
  merge_fn = function(batch) {
    var _a2;
    for (const [source2, value] of batch.current) {
      if (!this.previous.has(source2) && batch.previous.has(source2)) {
        this.previous.set(source2, batch.previous.get(source2));
      }
      this.current.set(source2, value);
    }
    for (const [effect2, deferred2] of batch.async_deriveds) {
      const d = this.async_deriveds.get(effect2);
      if (d) deferred2.promise.then(d.resolve).catch(d.reject);
    }
    batch.async_deriveds.clear();
    this.transfer_effects(__privateGet(batch, _dirty_effects2), __privateGet(batch, _maybe_dirty_effects2));
    const mark = (value) => {
      var reactions = value.reactions;
      if (reactions === null) return;
      for (const reaction of reactions) {
        var flags2 = reaction.f;
        if ((flags2 & DERIVED) !== 0) {
          mark(
            /** @type {Derived} */
            reaction
          );
        } else {
          var effect2 = (
            /** @type {Effect} */
            reaction
          );
          if (flags2 & (ASYNC | BLOCK_EFFECT) && !this.async_deriveds.has(effect2)) {
            __privateGet(this, _maybe_dirty_effects2).delete(effect2);
            set_signal_status(effect2, DIRTY);
            this.schedule(effect2);
          }
        }
      }
    };
    for (const source2 of this.current.keys()) {
      mark(source2);
    }
    this.oncommit(() => batch.discard());
    __privateMethod(_a2 = batch, _Batch_instances, unlink_fn).call(_a2);
    current_batch = this;
    __privateMethod(this, _Batch_instances, process_fn).call(this);
  };
  /**
   * @param {Effect[]} effects
   */
  defer_effects_fn = function(effects) {
    for (var i = 0; i < effects.length; i += 1) {
      defer_effect(effects[i], __privateGet(this, _dirty_effects2), __privateGet(this, _maybe_dirty_effects2));
    }
  };
  commit_fn = function() {
    var _a2;
    for (let batch = first_batch; batch !== null; batch = __privateGet(batch, _next)) {
      var is_earlier = batch.id < this.id;
      var sources = [];
      for (const [source3, [value, is_derived]] of this.current) {
        if (batch.current.has(source3)) {
          var batch_value = (
            /** @type {[any, boolean]} */
            batch.current.get(source3)[0]
          );
          if (is_earlier && value !== batch_value) {
            batch.current.set(source3, [value, is_derived]);
          } else {
            continue;
          }
        }
        sources.push(source3);
      }
      if (is_earlier) {
        for (const [effect2, deferred2] of this.async_deriveds) {
          const d = batch.async_deriveds.get(effect2);
          if (d) deferred2.promise.then(d.resolve).catch(d.reject);
        }
      }
      var current = [...batch.current.keys()].filter(
        (source3) => !/** @type {[any, boolean]} */
        batch.current.get(source3)[1]
      );
      if (!__privateGet(batch, _started) || current.length === 0) continue;
      var others = current.filter((source3) => !this.current.has(source3));
      if (others.length === 0) {
        if (is_earlier) {
          batch.discard();
        }
      } else if (sources.length > 0) {
        if (is_earlier) {
          for (const unskipped of __privateGet(this, _unskipped_branches)) {
            batch.unskip_effect(unskipped, (e) => {
              var _a3;
              if ((e.f & (BLOCK_EFFECT | ASYNC)) !== 0) {
                batch.schedule(e);
              } else {
                __privateMethod(_a3 = batch, _Batch_instances, defer_effects_fn).call(_a3, [e]);
              }
            });
          }
        }
        batch.activate();
        var marked = /* @__PURE__ */ new Set();
        var checked = /* @__PURE__ */ new Map();
        for (var source2 of sources) {
          mark_effects(source2, others, marked, checked);
        }
        checked = /* @__PURE__ */ new Map();
        var current_unequal = [...batch.current].filter(([c, v1]) => {
          const v2 = this.current.get(c);
          if (!v2) return true;
          return v2[0] !== v1[0] || v2[1] !== v1[1];
        }).map(([c]) => c);
        if (current_unequal.length > 0) {
          for (const effect2 of __privateGet(this, _new_effects)) {
            if ((effect2.f & (DESTROYED | INERT | EAGER_EFFECT)) === 0 && depends_on(effect2, current_unequal, checked)) {
              if ((effect2.f & (ASYNC | BLOCK_EFFECT)) !== 0) {
                set_signal_status(effect2, DIRTY);
                batch.schedule(effect2);
              } else {
                __privateGet(batch, _dirty_effects2).add(effect2);
              }
            }
          }
        }
        if (__privateGet(batch, _roots).length > 0 && !__privateGet(batch, _decrement_queued)) {
          batch.apply();
          for (var root2 of __privateGet(batch, _roots)) {
            __privateMethod(_a2 = batch, _Batch_instances, traverse_fn).call(_a2, root2, [], []);
          }
          __privateSet(batch, _roots, []);
        }
        batch.deactivate();
      }
    }
  };
  unlink_fn = function() {
    if (!this.linked) return;
    var prev = __privateGet(this, _prev);
    var next = __privateGet(this, _next);
    if (prev === null) {
      first_batch = next;
    } else {
      __privateSet(prev, _next, next);
    }
    if (next === null) {
      last_batch = prev;
    } else {
      __privateSet(next, _prev, prev);
    }
    this.linked = false;
  };
  let Batch = _Batch;
  function flushSync(fn) {
    var was_flushing_sync = is_flushing_sync;
    is_flushing_sync = true;
    try {
      var result;
      if (fn) ;
      while (true) {
        flush_tasks();
        if (current_batch === null) {
          return (
            /** @type {T} */
            result
          );
        }
        current_batch.flush();
      }
    } finally {
      is_flushing_sync = was_flushing_sync;
    }
  }
  function infinite_loop_guard() {
    try {
      effect_update_depth_exceeded();
    } catch (error) {
      invoke_error_boundary(error, last_scheduled_effect);
    }
  }
  let eager_block_effects = null;
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    var i = 0;
    while (i < length) {
      var effect2 = effects[i++];
      if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
        eager_block_effects = /* @__PURE__ */ new Set();
        update_effect(effect2);
        if (effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null && effect2.ac === null) {
          unlink_effect(effect2);
        }
        if ((eager_block_effects == null ? void 0 : eager_block_effects.size) > 0) {
          old_values.clear();
          for (const e of eager_block_effects) {
            if ((e.f & (DESTROYED | INERT)) !== 0) continue;
            const ordered_effects = [e];
            let ancestor = e.parent;
            while (ancestor !== null) {
              if (eager_block_effects.has(ancestor)) {
                eager_block_effects.delete(ancestor);
                ordered_effects.push(ancestor);
              }
              ancestor = ancestor.parent;
            }
            for (let j = ordered_effects.length - 1; j >= 0; j--) {
              const e2 = ordered_effects[j];
              if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
              update_effect(e2);
            }
          }
          eager_block_effects.clear();
        }
      }
    }
    eager_block_effects = null;
  }
  function mark_effects(value, sources, marked, checked) {
    if (marked.has(value)) return;
    marked.add(value);
    if (value.reactions !== null) {
      for (const reaction of value.reactions) {
        const flags2 = reaction.f;
        if ((flags2 & DERIVED) !== 0) {
          mark_effects(
            /** @type {Derived} */
            reaction,
            sources,
            marked,
            checked
          );
        } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
          set_signal_status(reaction, DIRTY);
          schedule_effect(
            /** @type {Effect} */
            reaction
          );
        }
      }
    }
  }
  function depends_on(reaction, sources, checked) {
    const depends = checked.get(reaction);
    if (depends !== void 0) return depends;
    if (reaction.deps !== null) {
      for (const dep of reaction.deps) {
        if (includes.call(sources, dep)) {
          return true;
        }
        if ((dep.f & DERIVED) !== 0 && depends_on(
          /** @type {Derived} */
          dep,
          sources,
          checked
        )) {
          checked.set(
            /** @type {Derived} */
            dep,
            true
          );
          return true;
        }
      }
    }
    checked.set(reaction, false);
    return false;
  }
  function schedule_effect(effect2) {
    current_batch.schedule(effect2);
  }
  function reset_branch(effect2, tracked) {
    if ((effect2.f & BRANCH_EFFECT) !== 0 && (effect2.f & CLEAN) !== 0) {
      return;
    }
    if ((effect2.f & DIRTY) !== 0) {
      tracked.d.push(effect2);
    } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
      tracked.m.push(effect2);
    }
    set_signal_status(effect2, CLEAN);
    var e = effect2.first;
    while (e !== null) {
      reset_branch(e, tracked);
      e = e.next;
    }
  }
  function reset_all(effect2) {
    set_signal_status(effect2, CLEAN);
    var e = effect2.first;
    while (e !== null) {
      reset_all(e);
      e = e.next;
    }
  }
  let eager_effects = /* @__PURE__ */ new Set();
  const old_values = /* @__PURE__ */ new Map();
  let eager_effects_deferred = false;
  function source(v, stack) {
    var signal = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      v,
      reactions: null,
      equals,
      rv: 0,
      wv: 0
    };
    return signal;
  }
  // @__NO_SIDE_EFFECTS__
  function state(v, stack) {
    const s = source(v);
    push_reaction_value(s);
    return s;
  }
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value, immutable = false, trackable = true) {
    var _a2;
    const s = source(initial_value);
    if (!immutable) {
      s.equals = safe_equals;
    }
    if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
      ((_a2 = component_context.l).s ?? (_a2.s = [])).push(s);
    }
    return s;
  }
  function set(source2, value, should_proxy = false) {
    if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
    // to ensure we error if state is set inside an inspect effect
    (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !current_sources.has(source2))) {
      state_unsafe_mutation();
    }
    let new_value = should_proxy ? proxy(value) : value;
    return internal_set(source2, new_value, legacy_updates);
  }
  function internal_set(source2, value, updated_during_traversal = null) {
    if (!source2.equals(value)) {
      old_values.set(source2, is_destroying_effect ? value : source2.v);
      var batch = Batch.ensure();
      batch.capture(source2, value);
      if ((source2.f & DERIVED) !== 0) {
        const derived2 = (
          /** @type {Derived} */
          source2
        );
        if ((source2.f & DIRTY) !== 0) {
          execute_derived(derived2);
        }
        if (batch_values === null) {
          update_derived_status(derived2);
        }
      }
      source2.wv = increment_write_version();
      mark_reactions(source2, DIRTY, updated_during_traversal);
      if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
      if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
        flush_eager_effects();
      }
    }
    return value;
  }
  function flush_eager_effects() {
    eager_effects_deferred = false;
    for (const effect2 of eager_effects) {
      if ((effect2.f & CLEAN) !== 0) {
        set_signal_status(effect2, MAYBE_DIRTY);
      }
      let dirty;
      try {
        dirty = is_dirty(effect2);
      } catch {
        dirty = true;
      }
      if (dirty) {
        update_effect(effect2);
      }
    }
    eager_effects.clear();
  }
  function increment(source2) {
    set(source2, source2.v + 1);
  }
  function mark_reactions(signal, status, updated_during_traversal) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags2 = reaction.f;
      if (!runes && reaction === active_effect) continue;
      var not_dirty = (flags2 & DIRTY) === 0;
      if (not_dirty) {
        set_signal_status(reaction, status);
      }
      if ((flags2 & EAGER_EFFECT) !== 0) {
        eager_effects.add(
          /** @type {Effect} */
          reaction
        );
      } else if ((flags2 & DERIVED) !== 0) {
        var derived2 = (
          /** @type {Derived} */
          reaction
        );
        batch_values == null ? void 0 : batch_values.delete(derived2);
        if ((flags2 & WAS_MARKED) === 0) {
          if (flags2 & CONNECTED && (active_effect === null || (active_effect.f & REACTION_IS_UPDATING) === 0)) {
            reaction.f |= WAS_MARKED;
          }
          mark_reactions(derived2, MAYBE_DIRTY, updated_during_traversal);
        }
      } else if (not_dirty) {
        var effect2 = (
          /** @type {Effect} */
          reaction
        );
        if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
          eager_block_effects.add(effect2);
        }
        if (updated_during_traversal !== null) {
          updated_during_traversal.push(effect2);
        } else {
          schedule_effect(effect2);
        }
      }
    }
  }
  function proxy(value) {
    if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
      return value;
    }
    const prototype = get_prototype_of(value);
    if (prototype !== object_prototype && prototype !== array_prototype) {
      return value;
    }
    var sources = /* @__PURE__ */ new Map();
    var is_proxied_array = is_array(value);
    var version = /* @__PURE__ */ state(0);
    var parent_version = update_version;
    var with_parent = (fn) => {
      if (update_version === parent_version) {
        return fn();
      }
      var reaction = active_reaction;
      var version2 = update_version;
      set_active_reaction(null);
      set_update_version(parent_version);
      var result = fn();
      set_active_reaction(reaction);
      set_update_version(version2);
      return result;
    };
    if (is_proxied_array) {
      sources.set("length", /* @__PURE__ */ state(
        /** @type {any[]} */
        value.length
      ));
    }
    return new Proxy(
      /** @type {any} */
      value,
      {
        defineProperty(_, prop2, descriptor) {
          if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
            state_descriptors_fixed();
          }
          var s = sources.get(prop2);
          if (s === void 0) {
            with_parent(() => {
              var s2 = /* @__PURE__ */ state(descriptor.value);
              sources.set(prop2, s2);
              return s2;
            });
          } else {
            set(s, descriptor.value, true);
          }
          return true;
        },
        deleteProperty(target, prop2) {
          var s = sources.get(prop2);
          if (s === void 0) {
            if (prop2 in target) {
              const s2 = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
              sources.set(prop2, s2);
              increment(version);
            }
          } else {
            set(s, UNINITIALIZED);
            increment(version);
          }
          return true;
        },
        get(target, prop2, receiver) {
          var _a2;
          if (prop2 === STATE_SYMBOL) {
            return value;
          }
          var s = sources.get(prop2);
          var exists = prop2 in target;
          if (s === void 0 && (!exists || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
            s = with_parent(() => {
              var p = proxy(exists ? target[prop2] : UNINITIALIZED);
              var s2 = /* @__PURE__ */ state(p);
              return s2;
            });
            sources.set(prop2, s);
          }
          if (s !== void 0) {
            var v = get(s);
            return v === UNINITIALIZED ? void 0 : v;
          }
          return Reflect.get(target, prop2, receiver);
        },
        getOwnPropertyDescriptor(target, prop2) {
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor && "value" in descriptor) {
            var s = sources.get(prop2);
            if (s) descriptor.value = get(s);
          } else if (descriptor === void 0) {
            var source2 = sources.get(prop2);
            var value2 = source2 == null ? void 0 : source2.v;
            if (source2 !== void 0 && value2 !== UNINITIALIZED) {
              return {
                enumerable: true,
                configurable: true,
                value: value2,
                writable: true
              };
            }
          }
          return descriptor;
        },
        has(target, prop2) {
          var _a2;
          if (prop2 === STATE_SYMBOL) {
            return true;
          }
          var s = sources.get(prop2);
          var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
          if (s !== void 0 || active_effect !== null && (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable))) {
            if (s === void 0) {
              s = with_parent(() => {
                var p = has ? proxy(target[prop2]) : UNINITIALIZED;
                var s2 = /* @__PURE__ */ state(p);
                return s2;
              });
              sources.set(prop2, s);
            }
            var value2 = get(s);
            if (value2 === UNINITIALIZED) {
              return false;
            }
          }
          return has;
        },
        set(target, prop2, value2, receiver) {
          var _a2;
          var s = sources.get(prop2);
          var has = prop2 in target;
          if (is_proxied_array && prop2 === "length") {
            for (var i = value2; i < /** @type {Source<number>} */
            s.v; i += 1) {
              var other_s = sources.get(i + "");
              if (other_s !== void 0) {
                set(other_s, UNINITIALIZED);
              } else if (i in target) {
                other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED));
                sources.set(i + "", other_s);
              }
            }
          }
          if (s === void 0) {
            if (!has || ((_a2 = get_descriptor(target, prop2)) == null ? void 0 : _a2.writable)) {
              s = with_parent(() => /* @__PURE__ */ state(void 0));
              set(s, proxy(value2));
              sources.set(prop2, s);
            }
          } else {
            has = s.v !== UNINITIALIZED;
            var p = with_parent(() => proxy(value2));
            set(s, p);
          }
          var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
          if (descriptor == null ? void 0 : descriptor.set) {
            descriptor.set.call(receiver, value2);
          }
          if (!has) {
            if (is_proxied_array && typeof prop2 === "string") {
              var ls = (
                /** @type {Source<number>} */
                sources.get("length")
              );
              var n = Number(prop2);
              if (Number.isInteger(n) && n >= ls.v) {
                set(ls, n + 1);
              }
            }
            increment(version);
          }
          return true;
        },
        ownKeys(target) {
          get(version);
          var own_keys = Reflect.ownKeys(target).filter((key2) => {
            var source3 = sources.get(key2);
            return source3 === void 0 || source3.v !== UNINITIALIZED;
          });
          for (var [key, source2] of sources) {
            if (source2.v !== UNINITIALIZED && !(key in target)) {
              own_keys.push(key);
            }
          }
          return own_keys;
        },
        setPrototypeOf() {
          state_prototype_fixed();
        }
      }
    );
  }
  function get_proxied_value(value) {
    try {
      if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
        return value[STATE_SYMBOL];
      }
    } catch {
    }
    return value;
  }
  function is(a, b) {
    return Object.is(get_proxied_value(a), get_proxied_value(b));
  }
  var $window;
  var is_firefox;
  var first_child_getter;
  var next_sibling_getter;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    is_firefox = /Firefox/.test(navigator.userAgent);
    var element_prototype = Element.prototype;
    var node_prototype = Node.prototype;
    var text_prototype = Text.prototype;
    first_child_getter = get_descriptor(node_prototype, "firstChild").get;
    next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
    if (is_extensible(element_prototype)) {
      element_prototype[CLASS_CACHE] = void 0;
      element_prototype[ATTRIBUTES_CACHE] = null;
      element_prototype[STYLE_CACHE] = void 0;
      element_prototype.__e = void 0;
    }
    if (is_extensible(text_prototype)) {
      text_prototype[TEXT_CACHE] = void 0;
    }
  }
  function create_text(value = "") {
    return document.createTextNode(value);
  }
  // @__NO_SIDE_EFFECTS__
  function get_first_child(node) {
    return (
      /** @type {TemplateNode | null} */
      first_child_getter.call(node)
    );
  }
  // @__NO_SIDE_EFFECTS__
  function get_next_sibling(node) {
    return (
      /** @type {TemplateNode | null} */
      next_sibling_getter.call(node)
    );
  }
  function child(node, is_text) {
    {
      return /* @__PURE__ */ get_first_child(node);
    }
  }
  function first_child(node, is_text = false) {
    {
      var first = /* @__PURE__ */ get_first_child(node);
      if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
      return first;
    }
  }
  function sibling(node, count = 1, is_text = false) {
    let next_sibling = node;
    while (count--) {
      next_sibling = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(next_sibling);
    }
    {
      return next_sibling;
    }
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  function should_defer_append() {
    return false;
  }
  function create_element(tag, namespace, is2) {
    if (namespace == null || namespace === NAMESPACE_HTML) {
      return (
        /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
        is2 ? document.createElement(tag, { is: is2 }) : document.createElement(tag)
      );
    }
    return (
      /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
      is2 ? document.createElementNS(namespace, tag, { is: is2 }) : document.createElementNS(namespace, tag)
    );
  }
  let listening_to_form_reset = false;
  function add_form_reset_listener() {
    if (!listening_to_form_reset) {
      listening_to_form_reset = true;
      document.addEventListener(
        "reset",
        (evt) => {
          Promise.resolve().then(() => {
            var _a2;
            if (!evt.defaultPrevented) {
              for (
                const e of
                /**@type {HTMLFormElement} */
                evt.target.elements
              ) {
                (_a2 = e[FORM_RESET_HANDLER]) == null ? void 0 : _a2.call(e);
              }
            }
          });
        },
        // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
        { capture: true }
      );
    }
  }
  function without_reactive_context(fn) {
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      return fn();
    } finally {
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  function listen_to_event_and_reset_event(element, event2, handler, on_reset = handler) {
    element.addEventListener(event2, () => without_reactive_context(handler));
    const prev = (
      /** @type {any} */
      element[FORM_RESET_HANDLER]
    );
    if (prev) {
      element[FORM_RESET_HANDLER] = () => {
        prev();
        on_reset(true);
      };
    } else {
      element[FORM_RESET_HANDLER] = () => on_reset(true);
    }
    add_form_reset_listener();
  }
  function validate_effect(rune) {
    if (active_effect === null) {
      if (active_reaction === null) {
        effect_orphan();
      }
      effect_in_unowned_derived();
    }
    if (is_destroying_effect) {
      effect_in_teardown();
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn) {
    var parent = active_effect;
    if (parent !== null && (parent.f & INERT) !== 0) {
      type |= INERT;
    }
    var effect2 = {
      ctx: component_context,
      deps: null,
      nodes: null,
      f: type | DIRTY | CONNECTED,
      first: null,
      fn,
      last: null,
      next: null,
      parent,
      b: parent && parent.b,
      prev: null,
      teardown: null,
      wv: 0,
      ac: null
    };
    current_batch == null ? void 0 : current_batch.register_created_effect(effect2);
    var e = effect2;
    if ((type & EFFECT) !== 0) {
      if (collected_effects !== null) {
        collected_effects.push(effect2);
      } else {
        Batch.ensure().schedule(effect2);
      }
    } else if (fn !== null) {
      try {
        update_effect(effect2);
      } catch (e2) {
        destroy_effect(effect2);
        throw e2;
      }
      if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
      (e.f & EFFECT_PRESERVED) === 0) {
        e = e.first;
        if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
          e.f |= EFFECT_TRANSPARENT;
        }
      }
    }
    if (e !== null) {
      e.parent = parent;
      if (parent !== null) {
        push_effect(e, parent);
      }
      if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
        var derived2 = (
          /** @type {Derived} */
          active_reaction
        );
        (derived2.effects ?? (derived2.effects = [])).push(e);
      }
    }
    return effect2;
  }
  function effect_tracking() {
    return active_reaction !== null && !untracking;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect();
    var flags2 = (
      /** @type {Effect} */
      active_effect.f
    );
    var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.i;
    if (defer) {
      var context = (
        /** @type {ComponentContext} */
        component_context
      );
      (context.e ?? (context.e = [])).push(fn);
    } else {
      return create_user_effect(fn);
    }
  }
  function create_user_effect(fn) {
    return create_effect(EFFECT | USER_EFFECT, fn);
  }
  function user_pre_effect(fn) {
    validate_effect();
    return create_effect(RENDER_EFFECT | USER_EFFECT, fn);
  }
  function component_root(fn) {
    Batch.ensure();
    const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
    return (options = {}) => {
      return new Promise((fulfil) => {
        if (options.outro) {
          pause_effect(effect2, () => {
            destroy_effect(effect2);
            fulfil(void 0);
          });
        } else {
          destroy_effect(effect2);
          fulfil(void 0);
        }
      });
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn);
  }
  function async_effect(fn) {
    return create_effect(ASYNC | EFFECT_PRESERVED, fn);
  }
  function render_effect(fn, flags2 = 0) {
    return create_effect(RENDER_EFFECT | flags2, fn);
  }
  function template_effect(fn, sync = [], async = [], blockers = []) {
    flatten(blockers, sync, async, (values) => {
      create_effect(RENDER_EFFECT, () => {
        fn(...values.map(get));
      });
    });
  }
  function block(fn, flags2 = 0) {
    var effect2 = create_effect(BLOCK_EFFECT | flags2, fn);
    return effect2;
  }
  function branch(fn) {
    return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_reaction = active_reaction;
      set_is_destroying_effect(true);
      set_active_reaction(null);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_active_reaction(previous_reaction);
      }
    }
  }
  function destroy_effect_children(signal, remove_dom = false) {
    var effect2 = signal.first;
    signal.first = signal.last = null;
    while (effect2 !== null) {
      const controller = effect2.ac;
      if (controller !== null) {
        without_reactive_context(() => {
          controller.abort(STALE_REACTION);
        });
      }
      var next = effect2.next;
      if ((effect2.f & ROOT_EFFECT) !== 0) {
        effect2.parent = null;
      } else {
        destroy_effect(effect2, remove_dom);
      }
      effect2 = next;
    }
  }
  function destroy_block_effect_children(signal) {
    var effect2 = signal.first;
    while (effect2 !== null) {
      var next = effect2.next;
      if ((effect2.f & BRANCH_EFFECT) === 0) {
        destroy_effect(effect2);
      }
      effect2 = next;
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var removed = false;
    if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
      remove_effect_dom(
        effect2.nodes.start,
        /** @type {TemplateNode} */
        effect2.nodes.end
      );
      removed = true;
    }
    effect2.f |= DESTROYING;
    destroy_effect_children(effect2, remove_dom && !removed);
    remove_reactions(effect2, 0);
    var transitions = effect2.nodes && effect2.nodes.t;
    if (transitions !== null) {
      for (const transition of transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    effect2.f ^= DESTROYING;
    effect2.f |= DESTROYED;
    var parent = effect2.parent;
    if (parent !== null && parent.first !== null) {
      unlink_effect(effect2);
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = effect2.b = null;
  }
  function remove_effect_dom(node, end) {
    while (node !== null) {
      var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
      node.remove();
      node = next;
    }
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next = effect2.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback, destroy = true) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    var fn = () => {
      if (destroy) destroy_effect(effect2);
      if (callback) callback();
    };
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    var t = effect2.nodes && effect2.nodes.t;
    if (t !== null) {
      for (const transition of t) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      if ((child2.f & ROOT_EFFECT) === 0) {
        var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
        pause_children(child2, transitions, transparent ? local : false);
      }
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    if ((effect2.f & CLEAN) === 0) {
      set_signal_status(effect2, DIRTY);
      Batch.ensure().schedule(effect2);
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    var t = effect2.nodes && effect2.nodes.t;
    if (t !== null) {
      for (const transition of t) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  function move_effect(effect2, fragment) {
    if (!effect2.nodes) return;
    var node = effect2.nodes.start;
    var end = effect2.nodes.end;
    while (node !== null) {
      var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
      fragment.append(node);
      node = next;
    }
  }
  let is_updating_effect = false;
  let is_destroying_effect = false;
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  let active_reaction = null;
  let untracking = false;
  function set_active_reaction(reaction) {
    active_reaction = reaction;
  }
  let active_effect = null;
  function set_active_effect(effect2) {
    active_effect = effect2;
  }
  let current_sources = null;
  function push_reaction_value(value) {
    if (active_reaction !== null && true) {
      (current_sources ?? (current_sources = /* @__PURE__ */ new Set())).add(value);
    }
  }
  let new_deps = null;
  let skipped_deps = 0;
  let untracked_writes = null;
  function set_untracked_writes(value) {
    untracked_writes = value;
  }
  let write_version = 1;
  let read_version = 0;
  let update_version = read_version;
  function set_update_version(value) {
    update_version = value;
  }
  function increment_write_version() {
    return ++write_version;
  }
  function is_dirty(reaction) {
    var flags2 = reaction.f;
    if ((flags2 & DIRTY) !== 0) {
      return true;
    }
    if (flags2 & DERIVED) {
      reaction.f &= ~WAS_MARKED;
    }
    if ((flags2 & MAYBE_DIRTY) !== 0) {
      var dependencies = (
        /** @type {Value[]} */
        reaction.deps
      );
      var length = dependencies.length;
      for (var i = 0; i < length; i++) {
        var dependency = dependencies[i];
        if (is_dirty(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (dependency.wv > reaction.wv) {
          return true;
        }
      }
      if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
      // traversal of the graph in the other batches still happens
      batch_values === null) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function schedule_possible_effect_self_invalidation(signal, effect2, root2 = true) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    if (current_sources !== null && current_sources.has(signal)) {
      return;
    }
    for (var i = 0; i < reactions.length; i++) {
      var reaction = reactions[i];
      if ((reaction.f & DERIVED) !== 0) {
        schedule_possible_effect_self_invalidation(
          /** @type {Derived} */
          reaction,
          effect2,
          false
        );
      } else if (effect2 === reaction) {
        if (root2) {
          set_signal_status(reaction, DIRTY);
        } else if ((reaction.f & CLEAN) !== 0) {
          set_signal_status(reaction, MAYBE_DIRTY);
        }
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
  function update_reaction(reaction) {
    var _a2;
    var previous_deps = new_deps;
    var previous_skipped_deps = skipped_deps;
    var previous_untracked_writes = untracked_writes;
    var previous_reaction = active_reaction;
    var previous_sources = current_sources;
    var previous_component_context = component_context;
    var previous_untracking = untracking;
    var previous_update_version = update_version;
    var flags2 = reaction.f;
    new_deps = /** @type {null | Value[]} */
    null;
    skipped_deps = 0;
    untracked_writes = null;
    active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
    current_sources = null;
    set_component_context(reaction.ctx);
    untracking = false;
    update_version = ++read_version;
    if (reaction.ac !== null) {
      without_reactive_context(() => {
        reaction.ac.abort(STALE_REACTION);
      });
      reaction.ac = null;
    }
    try {
      reaction.f |= REACTION_IS_UPDATING;
      var fn = (
        /** @type {Function} */
        reaction.fn
      );
      var result = fn();
      reaction.f |= REACTION_RAN;
      var deps = reaction.deps;
      var is_fork = current_batch == null ? void 0 : current_batch.is_fork;
      if (new_deps !== null) {
        var i;
        if (!is_fork) {
          remove_reactions(reaction, skipped_deps);
        }
        if (deps !== null && skipped_deps > 0) {
          deps.length = skipped_deps + new_deps.length;
          for (i = 0; i < new_deps.length; i++) {
            deps[skipped_deps + i] = new_deps[i];
          }
        } else {
          reaction.deps = deps = new_deps;
        }
        if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
          for (i = skipped_deps; i < deps.length; i++) {
            ((_a2 = deps[i]).reactions ?? (_a2.reactions = [])).push(reaction);
          }
        }
      } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
        remove_reactions(reaction, skipped_deps);
        deps.length = skipped_deps;
      }
      if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
        for (i = 0; i < /** @type {Source[]} */
        untracked_writes.length; i++) {
          schedule_possible_effect_self_invalidation(
            untracked_writes[i],
            /** @type {Effect} */
            reaction
          );
        }
      }
      if (previous_reaction !== null && previous_reaction !== reaction) {
        read_version++;
        if (previous_reaction.deps !== null) {
          for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
            previous_reaction.deps[i2].rv = read_version;
          }
        }
        if (previous_deps !== null) {
          for (const dep of previous_deps) {
            dep.rv = read_version;
          }
        }
        if (untracked_writes !== null) {
          if (previous_untracked_writes === null) {
            previous_untracked_writes = untracked_writes;
          } else {
            previous_untracked_writes.push(.../** @type {Source[]} */
            untracked_writes);
          }
        }
      }
      if ((reaction.f & ERROR_VALUE) !== 0) {
        reaction.f ^= ERROR_VALUE;
      }
      return result;
    } catch (error) {
      return handle_error(error);
    } finally {
      reaction.f ^= REACTION_IS_UPDATING;
      new_deps = previous_deps;
      skipped_deps = previous_skipped_deps;
      untracked_writes = previous_untracked_writes;
      active_reaction = previous_reaction;
      current_sources = previous_sources;
      set_component_context(previous_component_context);
      untracking = previous_untracking;
      update_version = previous_update_version;
    }
  }
  function remove_reaction(signal, dependency) {
    let reactions = dependency.reactions;
    if (reactions !== null) {
      var index = index_of.call(reactions, signal);
      if (index !== -1) {
        var new_length = reactions.length - 1;
        if (new_length === 0) {
          reactions = dependency.reactions = null;
        } else {
          reactions[index] = reactions[new_length];
          reactions.pop();
        }
      }
    }
    if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
    // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
    // allows us to skip the expensive work of disconnecting and immediately reconnecting it
    (new_deps === null || !includes.call(new_deps, dependency))) {
      var derived2 = (
        /** @type {Derived} */
        dependency
      );
      if ((derived2.f & CONNECTED) !== 0) {
        derived2.f ^= CONNECTED;
        derived2.f &= ~WAS_MARKED;
      }
      if (derived2.v !== UNINITIALIZED) {
        update_derived_status(derived2);
      }
      freeze_derived_effects(derived2);
      remove_reactions(derived2, 0);
    }
  }
  function remove_reactions(signal, start_index) {
    var dependencies = signal.deps;
    if (dependencies === null) return;
    for (var i = start_index; i < dependencies.length; i++) {
      remove_reaction(signal, dependencies[i]);
    }
  }
  function update_effect(effect2) {
    var flags2 = effect2.f;
    if ((flags2 & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var previous_effect = active_effect;
    var was_updating_effect = is_updating_effect;
    active_effect = effect2;
    is_updating_effect = true;
    try {
      if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
        destroy_block_effect_children(effect2);
      } else {
        destroy_effect_children(effect2);
      }
      execute_effect_teardown(effect2);
      var teardown2 = update_reaction(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
      effect2.wv = write_version;
      var dep;
      if (DEV && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) ;
    } finally {
      is_updating_effect = was_updating_effect;
      active_effect = previous_effect;
    }
  }
  async function tick() {
    await Promise.resolve();
    flushSync();
  }
  function get(signal) {
    var flags2 = signal.f;
    var is_derived = (flags2 & DERIVED) !== 0;
    if (active_reaction !== null && !untracking) {
      var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
      if (!destroyed && (current_sources === null || !current_sources.has(signal))) {
        var deps = active_reaction.deps;
        if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
          if (signal.rv < read_version) {
            signal.rv = read_version;
            if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
              skipped_deps++;
            } else if (new_deps === null) {
              new_deps = [signal];
            } else {
              new_deps.push(signal);
            }
          }
        } else {
          active_reaction.deps ?? (active_reaction.deps = []);
          if (!includes.call(active_reaction.deps, signal)) {
            active_reaction.deps.push(signal);
          }
          var reactions = signal.reactions;
          if (reactions === null) {
            signal.reactions = [active_reaction];
          } else if (!includes.call(reactions, active_reaction)) {
            reactions.push(active_reaction);
          }
        }
      }
    }
    if (is_destroying_effect && old_values.has(signal)) {
      return old_values.get(signal);
    }
    if (is_derived) {
      var derived2 = (
        /** @type {Derived} */
        signal
      );
      if (is_destroying_effect) {
        var value = derived2.v;
        if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
          value = execute_derived(derived2);
        }
        old_values.set(derived2, value);
        return value;
      }
      var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
      var is_new = (derived2.f & REACTION_RAN) === 0;
      if (is_dirty(derived2)) {
        if (should_connect) {
          derived2.f |= CONNECTED;
        }
        update_derived(derived2);
      }
      if (should_connect && !is_new) {
        unfreeze_derived_effects(derived2);
        reconnect(derived2);
      }
    }
    if (batch_values == null ? void 0 : batch_values.has(signal)) {
      return batch_values.get(signal);
    }
    if ((signal.f & ERROR_VALUE) !== 0) {
      throw signal.v;
    }
    return signal.v;
  }
  function reconnect(derived2) {
    derived2.f |= CONNECTED;
    if (derived2.deps === null) return;
    for (const dep of derived2.deps) {
      (dep.reactions ?? (dep.reactions = [])).push(derived2);
      if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
        unfreeze_derived_effects(
          /** @type {Derived} */
          dep
        );
        reconnect(
          /** @type {Derived} */
          dep
        );
      }
    }
  }
  function depends_on_old_values(derived2) {
    if (derived2.v === UNINITIALIZED) return true;
    if (derived2.deps === null) return false;
    for (const dep of derived2.deps) {
      if (old_values.has(dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
        /** @type {Derived} */
        dep
      )) {
        return true;
      }
    }
    return false;
  }
  function untrack(fn) {
    var previous_untracking = untracking;
    try {
      untracking = true;
      return fn();
    } finally {
      untracking = previous_untracking;
    }
  }
  function deep_read_state(value) {
    if (typeof value !== "object" || !value || value instanceof EventTarget) {
      return;
    }
    if (STATE_SYMBOL in value) {
      deep_read(value);
    } else if (!Array.isArray(value)) {
      for (let key in value) {
        const prop2 = value[key];
        if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
          deep_read(prop2);
        }
      }
    }
  }
  function deep_read(value, visited = /* @__PURE__ */ new Set()) {
    if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
    !(value instanceof EventTarget) && !visited.has(value)) {
      visited.add(value);
      if (value instanceof Date) {
        value.getTime();
      }
      for (let key in value) {
        try {
          deep_read(value[key], visited);
        } catch (e) {
        }
      }
      const proto = get_prototype_of(value);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
        const descriptors = get_descriptors(proto);
        for (let key in descriptors) {
          const get2 = descriptors[key].get;
          if (get2) {
            try {
              get2.call(value);
            } catch (e) {
            }
          }
        }
      }
    }
  }
  const PASSIVE_EVENTS = ["touchstart", "touchmove"];
  function is_passive_event(name) {
    return PASSIVE_EVENTS.includes(name);
  }
  const event_symbol = Symbol("events");
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function create_event(event_name, dom, handler, options = {}) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation.call(dom, event2);
      }
      if (!event2.cancelBubble) {
        return without_reactive_context(() => {
          return handler == null ? void 0 : handler.call(this, event2);
        });
      }
    }
    if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture2, passive) {
    var options = { capture: capture2, passive };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || // @ts-ignore
    dom === window || // @ts-ignore
    dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
    dom instanceof HTMLMediaElement) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function delegated(event_name, element, handler) {
    (element[event_symbol] ?? (element[event_symbol] = {}))[event_name] = handler;
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  let last_propagated_event = null;
  function handle_event_propagation(event2) {
    var _a2, _b2;
    var handler_element = this;
    var owner_document = (
      /** @type {Node} */
      handler_element.ownerDocument
    );
    var event_name = event2.type;
    var path = ((_a2 = event2.composedPath) == null ? void 0 : _a2.call(event2)) || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    last_propagated_event = event2;
    var path_idx = 0;
    var handled_at = last_propagated_event === event2 && event2[event_symbol];
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2[event_symbol] = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    var previous_reaction = active_reaction;
    var previous_effect = active_effect;
    set_active_reaction(null);
    set_active_effect(null);
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        if (current_target === handler_element) break;
        try {
          var delegated2 = (_b2 = current_target[event_symbol]) == null ? void 0 : _b2[event_name];
          if (delegated2 != null && (!/** @type {any} */
          current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          event2.target === current_target)) {
            delegated2.call(current_target, event2);
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble) break;
        path_idx++;
        current_target = path_idx < path.length ? (
          /** @type {Element} */
          path[path_idx]
        ) : null;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2[event_symbol] = handler_element;
      delete event2.currentTarget;
      set_active_reaction(previous_reaction);
      set_active_effect(previous_effect);
    }
  }
  const policy = (
    // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
    ((_a = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : _a.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
      /** @param {string} html */
      createHTML: (html2) => {
        return html2;
      }
    })
  );
  function create_trusted_html(html2) {
    return (
      /** @type {string} */
      (policy == null ? void 0 : policy.createHTML(html2)) ?? html2
    );
  }
  function create_fragment_from_html(html2) {
    var elem = create_element("template");
    elem.innerHTML = create_trusted_html(html2.replaceAll("<!>", "<!---->"));
    return elem.content;
  }
  function assign_nodes(start, end) {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (effect2.nodes === null) {
      effect2.nodes = { start, end, a: null, t: null };
    }
  }
  // @__NO_SIDE_EFFECTS__
  function from_html(content, flags2) {
    var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    var has_start = !content.startsWith("<!>");
    return () => {
      if (node === void 0) {
        node = create_fragment_from_html(has_start ? content : "<!>" + content);
        if (!is_fragment) node = /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(node);
      }
      var clone = (
        /** @type {TemplateNode} */
        use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
      );
      if (is_fragment) {
        var start = (
          /** @type {TemplateNode} */
          /* @__PURE__ */ get_first_child(clone)
        );
        var end = (
          /** @type {TemplateNode} */
          clone.lastChild
        );
        assign_nodes(start, end);
      } else {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  // @__NO_SIDE_EFFECTS__
  function from_namespace(content, flags2, ns = "svg") {
    var has_start = !content.startsWith("<!>");
    var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
    var node;
    return () => {
      if (!node) {
        var fragment = (
          /** @type {DocumentFragment} */
          create_fragment_from_html(wrapped)
        );
        var root2 = (
          /** @type {Element} */
          /* @__PURE__ */ get_first_child(fragment)
        );
        {
          node = /** @type {Element} */
          /* @__PURE__ */ get_first_child(root2);
        }
      }
      var clone = (
        /** @type {TemplateNode} */
        node.cloneNode(true)
      );
      {
        assign_nodes(clone, clone);
      }
      return clone;
    };
  }
  // @__NO_SIDE_EFFECTS__
  function from_svg(content, flags2) {
    return /* @__PURE__ */ from_namespace(content, flags2, "svg");
  }
  function text(value = "") {
    {
      var t = create_text(value + "");
      assign_nodes(t, t);
      return t;
    }
  }
  function comment$1() {
    var frag = document.createDocumentFragment();
    var start = document.createComment("");
    var anchor = create_text();
    frag.append(start, anchor);
    assign_nodes(start, anchor);
    return frag;
  }
  function append(anchor, dom) {
    if (anchor === null) {
      return;
    }
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  function set_text(text2, value) {
    var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
    if (str !== /** @type {any} */
    (text2[TEXT_CACHE] ?? (text2[TEXT_CACHE] = text2.nodeValue))) {
      text2[TEXT_CACHE] = str;
      text2.nodeValue = `${str}`;
    }
  }
  function mount(component, options) {
    return _mount(component, options);
  }
  const listeners = /* @__PURE__ */ new Map();
  function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
    init_operations();
    var component = void 0;
    var unmount2 = component_root(() => {
      var anchor_node = anchor ?? target.appendChild(create_text());
      boundary(
        /** @type {TemplateNode} */
        anchor_node,
        {
          pending: () => {
          }
        },
        (anchor_node2) => {
          push({});
          var ctx = (
            /** @type {ComponentContext} */
            component_context
          );
          if (context) ctx.c = context;
          if (events) {
            props.$$events = events;
          }
          component = Component(anchor_node2, props) || {};
          pop();
        },
        transformError
      );
      var registered_events = /* @__PURE__ */ new Set();
      var event_handle = (events2) => {
        for (var i = 0; i < events2.length; i++) {
          var event_name = events2[i];
          if (registered_events.has(event_name)) continue;
          registered_events.add(event_name);
          var passive = is_passive_event(event_name);
          for (const node of [target, document]) {
            var counts = listeners.get(node);
            if (counts === void 0) {
              counts = /* @__PURE__ */ new Map();
              listeners.set(node, counts);
            }
            var count = counts.get(event_name);
            if (count === void 0) {
              node.addEventListener(event_name, handle_event_propagation, { passive });
              counts.set(event_name, 1);
            } else {
              counts.set(event_name, count + 1);
            }
          }
        }
      };
      event_handle(array_from(all_registered_events));
      root_event_handles.add(event_handle);
      return () => {
        var _a2;
        for (var event_name of registered_events) {
          for (const node of [target, document]) {
            var counts = (
              /** @type {Map<string, number>} */
              listeners.get(node)
            );
            var count = (
              /** @type {number} */
              counts.get(event_name)
            );
            if (--count == 0) {
              node.removeEventListener(event_name, handle_event_propagation);
              counts.delete(event_name);
              if (counts.size === 0) {
                listeners.delete(node);
              }
            } else {
              counts.set(event_name, count);
            }
          }
        }
        root_event_handles.delete(event_handle);
        if (anchor_node !== anchor) {
          (_a2 = anchor_node.parentNode) == null ? void 0 : _a2.removeChild(anchor_node);
        }
      };
    });
    mounted_components.set(component, unmount2);
    return component;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component, options) {
    const fn = mounted_components.get(component);
    if (fn) {
      mounted_components.delete(component);
      return fn(options);
    }
    return Promise.resolve();
  }
  class BranchManager {
    /**
     * @param {TemplateNode} anchor
     * @param {boolean} transition
     */
    constructor(anchor, transition = true) {
      /** @type {TemplateNode} */
      __publicField(this, "anchor");
      /** @type {Map<Batch, Key>} */
      __privateAdd(this, _batches, /* @__PURE__ */ new Map());
      /**
       * Map of keys to effects that are currently rendered in the DOM.
       * These effects are visible and actively part of the document tree.
       * Example:
       * ```
       * {#if condition}
       * 	foo
       * {:else}
       * 	bar
       * {/if}
       * ```
       * Can result in the entries `true->Effect` and `false->Effect`
       * @type {Map<Key, Effect>}
       */
      __privateAdd(this, _onscreen, /* @__PURE__ */ new Map());
      /**
       * Similar to #onscreen with respect to the keys, but contains branches that are not yet
       * in the DOM, because their insertion is deferred.
       * @type {Map<Key, Branch>}
       */
      __privateAdd(this, _offscreen, /* @__PURE__ */ new Map());
      /**
       * Keys of effects that are currently outroing
       * @type {Set<Key>}
       */
      __privateAdd(this, _outroing, /* @__PURE__ */ new Set());
      /**
       * Whether to pause (i.e. outro) on change, or destroy immediately.
       * This is necessary for `<svelte:element>`
       */
      __privateAdd(this, _transition, true);
      /**
       * @param {Batch} batch
       */
      __privateAdd(this, _commit, (batch) => {
        if (!__privateGet(this, _batches).has(batch)) return;
        var key = (
          /** @type {Key} */
          __privateGet(this, _batches).get(batch)
        );
        var onscreen = __privateGet(this, _onscreen).get(key);
        if (onscreen) {
          resume_effect(onscreen);
          __privateGet(this, _outroing).delete(key);
        } else {
          var offscreen = __privateGet(this, _offscreen).get(key);
          if (offscreen) {
            resume_effect(offscreen.effect);
            __privateGet(this, _onscreen).set(key, offscreen.effect);
            __privateGet(this, _offscreen).delete(key);
            offscreen.fragment.lastChild.remove();
            this.anchor.before(offscreen.fragment);
            onscreen = offscreen.effect;
          }
        }
        for (const [b, k] of __privateGet(this, _batches)) {
          __privateGet(this, _batches).delete(b);
          if (b === batch) {
            break;
          }
          const offscreen2 = __privateGet(this, _offscreen).get(k);
          if (offscreen2) {
            destroy_effect(offscreen2.effect);
            __privateGet(this, _offscreen).delete(k);
          }
        }
        for (const [k, effect2] of __privateGet(this, _onscreen)) {
          if (k === key || __privateGet(this, _outroing).has(k)) continue;
          const on_destroy = () => {
            const keys = Array.from(__privateGet(this, _batches).values());
            if (keys.includes(k)) {
              var fragment = document.createDocumentFragment();
              move_effect(effect2, fragment);
              fragment.append(create_text());
              __privateGet(this, _offscreen).set(k, { effect: effect2, fragment });
            } else {
              destroy_effect(effect2);
            }
            __privateGet(this, _outroing).delete(k);
            __privateGet(this, _onscreen).delete(k);
          };
          if (__privateGet(this, _transition) || !onscreen) {
            __privateGet(this, _outroing).add(k);
            pause_effect(effect2, on_destroy, false);
          } else {
            on_destroy();
          }
        }
      });
      /**
       * @param {Batch} batch
       */
      __privateAdd(this, _discard, (batch) => {
        __privateGet(this, _batches).delete(batch);
        const keys = Array.from(__privateGet(this, _batches).values());
        for (const [k, branch2] of __privateGet(this, _offscreen)) {
          if (!keys.includes(k)) {
            destroy_effect(branch2.effect);
            __privateGet(this, _offscreen).delete(k);
          }
        }
      });
      this.anchor = anchor;
      __privateSet(this, _transition, transition);
    }
    /**
     *
     * @param {any} key
     * @param {null | ((target: TemplateNode) => void)} fn
     */
    ensure(key, fn) {
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      var defer = should_defer_append();
      if (fn && !__privateGet(this, _onscreen).has(key) && !__privateGet(this, _offscreen).has(key)) {
        if (defer) {
          var fragment = document.createDocumentFragment();
          var target = create_text();
          fragment.append(target);
          __privateGet(this, _offscreen).set(key, {
            effect: branch(() => fn(target)),
            fragment
          });
        } else {
          __privateGet(this, _onscreen).set(
            key,
            branch(() => fn(this.anchor))
          );
        }
      }
      __privateGet(this, _batches).set(batch, key);
      if (defer) {
        for (const [k, effect2] of __privateGet(this, _onscreen)) {
          if (k === key) {
            batch.unskip_effect(effect2);
          } else {
            batch.skip_effect(effect2);
          }
        }
        for (const [k, branch2] of __privateGet(this, _offscreen)) {
          if (k === key) {
            batch.unskip_effect(branch2.effect);
          } else {
            batch.skip_effect(branch2.effect);
          }
        }
        batch.oncommit(__privateGet(this, _commit));
        batch.ondiscard(__privateGet(this, _discard));
      } else {
        __privateGet(this, _commit).call(this, batch);
      }
    }
  }
  _batches = new WeakMap();
  _onscreen = new WeakMap();
  _offscreen = new WeakMap();
  _outroing = new WeakMap();
  _transition = new WeakMap();
  _commit = new WeakMap();
  _discard = new WeakMap();
  function if_block(node, fn, elseif = false) {
    var branches = new BranchManager(node);
    var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
    function update_branch(key, fn2) {
      branches.ensure(key, fn2);
    }
    block(() => {
      var has_branch = false;
      fn((fn2, key = 0) => {
        has_branch = true;
        update_branch(key, fn2);
      });
      if (!has_branch) {
        update_branch(-1, null);
      }
    }, flags2);
  }
  function pause_effects(state2, to_destroy, controlled_anchor) {
    var transitions = [];
    var length = to_destroy.length;
    var group;
    var remaining = to_destroy.length;
    for (var i = 0; i < length; i++) {
      let effect2 = to_destroy[i];
      pause_effect(
        effect2,
        () => {
          if (group) {
            group.pending.delete(effect2);
            group.done.add(effect2);
            if (group.pending.size === 0) {
              var groups = (
                /** @type {Set<EachOutroGroup>} */
                state2.outrogroups
              );
              destroy_effects(state2, array_from(group.done));
              groups.delete(group);
              if (groups.size === 0) {
                state2.outrogroups = null;
              }
            }
          } else {
            remaining -= 1;
          }
        },
        false
      );
    }
    if (remaining === 0) {
      var fast_path = transitions.length === 0 && controlled_anchor !== null;
      if (fast_path) {
        var anchor = (
          /** @type {Element} */
          controlled_anchor
        );
        var parent_node = (
          /** @type {Element} */
          anchor.parentNode
        );
        clear_text_content(parent_node);
        parent_node.append(anchor);
        state2.items.clear();
      }
      destroy_effects(state2, to_destroy, !fast_path);
    } else {
      group = {
        pending: new Set(to_destroy),
        done: /* @__PURE__ */ new Set()
      };
      (state2.outrogroups ?? (state2.outrogroups = /* @__PURE__ */ new Set())).add(group);
    }
  }
  function destroy_effects(state2, to_destroy, remove_dom = true) {
    var preserved_effects;
    if (state2.pending.size > 0) {
      preserved_effects = /* @__PURE__ */ new Set();
      for (const keys of state2.pending.values()) {
        for (const key of keys) {
          preserved_effects.add(
            /** @type {EachItem} */
            state2.items.get(key).e
          );
        }
      }
    }
    for (var i = 0; i < to_destroy.length; i++) {
      var e = to_destroy[i];
      if (preserved_effects == null ? void 0 : preserved_effects.has(e)) {
        e.f |= EFFECT_OFFSCREEN;
        const fragment = document.createDocumentFragment();
        move_effect(e, fragment);
      } else {
        destroy_effect(to_destroy[i], remove_dom);
      }
    }
  }
  var offscreen_anchor;
  function each(node, flags2, get_collection, get_key, render_fn2, fallback_fn = null) {
    var anchor = node;
    var items = /* @__PURE__ */ new Map();
    var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
      anchor = parent_node.appendChild(create_text());
    }
    var fallback = null;
    var each_array = /* @__PURE__ */ derived_safe_equal(() => {
      var collection = get_collection();
      return (
        /** @type {V[]} */
        is_array(collection) ? collection : collection == null ? [] : array_from(collection)
      );
    });
    var array;
    var pending = /* @__PURE__ */ new Map();
    var first_run = true;
    function commit(batch) {
      if ((state2.effect.f & DESTROYED) !== 0) {
        return;
      }
      state2.pending.delete(batch);
      state2.fallback = fallback;
      reconcile(state2, array, anchor, flags2, get_key);
      if (fallback !== null) {
        if (array.length === 0) {
          if ((fallback.f & EFFECT_OFFSCREEN) === 0) {
            resume_effect(fallback);
          } else {
            fallback.f ^= EFFECT_OFFSCREEN;
            move(fallback, null, anchor);
          }
        } else {
          pause_effect(fallback, () => {
            fallback = null;
          });
        }
      }
    }
    function discard(batch) {
      state2.pending.delete(batch);
    }
    var effect2 = block(() => {
      array = /** @type {V[]} */
      get(each_array);
      var length = array.length;
      var keys = /* @__PURE__ */ new Set();
      var batch = (
        /** @type {Batch} */
        current_batch
      );
      var defer = should_defer_append();
      for (var index = 0; index < length; index += 1) {
        var value = array[index];
        var key = get_key(value, index);
        var item = first_run ? null : items.get(key);
        if (item) {
          if (item.v) internal_set(item.v, value);
          if (item.i) internal_set(item.i, index);
          if (defer) {
            batch.unskip_effect(item.e);
          }
        } else {
          item = create_item(
            items,
            first_run ? anchor : offscreen_anchor ?? (offscreen_anchor = create_text()),
            value,
            key,
            index,
            render_fn2,
            flags2,
            get_collection
          );
          if (!first_run) {
            item.e.f |= EFFECT_OFFSCREEN;
          }
          items.set(key, item);
        }
        keys.add(key);
      }
      if (length === 0 && fallback_fn && !fallback) {
        if (first_run) {
          fallback = branch(() => fallback_fn(anchor));
        } else {
          fallback = branch(() => fallback_fn(offscreen_anchor ?? (offscreen_anchor = create_text())));
          fallback.f |= EFFECT_OFFSCREEN;
        }
      }
      if (length > keys.size) {
        {
          each_key_duplicate();
        }
      }
      if (!first_run) {
        pending.set(batch, keys);
        if (defer) {
          for (const [key2, item2] of items) {
            if (!keys.has(key2)) {
              batch.skip_effect(item2.e);
            }
          }
          batch.oncommit(commit);
          batch.ondiscard(discard);
        } else {
          commit(batch);
        }
      }
      get(each_array);
    });
    var state2 = { effect: effect2, items, pending, outrogroups: null, fallback };
    first_run = false;
  }
  function skip_to_branch(effect2) {
    while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
      effect2 = effect2.next;
    }
    return effect2;
  }
  function reconcile(state2, array, anchor, flags2, get_key) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
    var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
    var length = array.length;
    var items = state2.items;
    var current = skip_to_branch(state2.effect.first);
    var seen;
    var prev = null;
    var to_animate;
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var effect2;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key = get_key(value, i);
        effect2 = /** @type {EachItem} */
        items.get(key).e;
        if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
          (_b2 = (_a2 = effect2.nodes) == null ? void 0 : _a2.a) == null ? void 0 : _b2.measure();
          (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(effect2);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      effect2 = /** @type {EachItem} */
      items.get(key).e;
      if (state2.outrogroups !== null) {
        for (const group of state2.outrogroups) {
          group.pending.delete(effect2);
          group.done.delete(effect2);
        }
      }
      if ((effect2.f & INERT) !== 0) {
        resume_effect(effect2);
        if (is_animated) {
          (_d = (_c = effect2.nodes) == null ? void 0 : _c.a) == null ? void 0 : _d.unfix();
          (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(effect2);
        }
      }
      if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
        effect2.f ^= EFFECT_OFFSCREEN;
        if (effect2 === current) {
          move(effect2, null, anchor);
        } else {
          var next = prev ? prev.next : current;
          if (effect2 === state2.effect.last) {
            state2.effect.last = effect2.prev;
          }
          if (effect2.prev) effect2.prev.next = effect2.next;
          if (effect2.next) effect2.next.prev = effect2.prev;
          link(state2, prev, effect2);
          link(state2, effect2, next);
          move(effect2, next, anchor);
          prev = effect2;
          matched = [];
          stashed = [];
          current = skip_to_branch(prev.next);
          continue;
        }
      }
      if (effect2 !== current) {
        if (seen !== void 0 && seen.has(effect2)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(state2, a.prev, b.next);
            link(state2, prev, a);
            link(state2, b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(effect2);
            move(effect2, current, anchor);
            link(state2, effect2.prev, effect2.next);
            link(state2, effect2, prev === null ? state2.effect.first : prev.next);
            link(state2, prev, effect2);
            prev = effect2;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current !== effect2) {
          (seen ?? (seen = /* @__PURE__ */ new Set())).add(current);
          stashed.push(current);
          current = skip_to_branch(current.next);
        }
        if (current === null) {
          continue;
        }
      }
      if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
        matched.push(effect2);
      }
      prev = effect2;
      current = skip_to_branch(effect2.next);
    }
    if (state2.outrogroups !== null) {
      for (const group of state2.outrogroups) {
        if (group.pending.size === 0) {
          destroy_effects(state2, array_from(group.done));
          (_e = state2.outrogroups) == null ? void 0 : _e.delete(group);
        }
      }
      if (state2.outrogroups.size === 0) {
        state2.outrogroups = null;
      }
    }
    if (current !== null || seen !== void 0) {
      var to_destroy = [];
      if (seen !== void 0) {
        for (effect2 of seen) {
          if ((effect2.f & INERT) === 0) {
            to_destroy.push(effect2);
          }
        }
      }
      while (current !== null) {
        if ((current.f & INERT) === 0 && current !== state2.fallback) {
          to_destroy.push(current);
        }
        current = skip_to_branch(current.next);
      }
      var destroy_length = to_destroy.length;
      if (destroy_length > 0) {
        var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
        if (is_animated) {
          for (i = 0; i < destroy_length; i += 1) {
            (_g = (_f = to_destroy[i].nodes) == null ? void 0 : _f.a) == null ? void 0 : _g.measure();
          }
          for (i = 0; i < destroy_length; i += 1) {
            (_i = (_h = to_destroy[i].nodes) == null ? void 0 : _h.a) == null ? void 0 : _i.fix();
          }
        }
        pause_effects(state2, to_destroy, controlled_anchor);
      }
    }
    if (is_animated) {
      queue_micro_task(() => {
        var _a3, _b3;
        if (to_animate === void 0) return;
        for (effect2 of to_animate) {
          (_b3 = (_a3 = effect2.nodes) == null ? void 0 : _a3.a) == null ? void 0 : _b3.apply();
        }
      });
    }
  }
  function create_item(items, anchor, value, key, index, render_fn2, flags2, get_collection) {
    var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
    var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index) : null;
    return {
      v,
      i,
      e: branch(() => {
        render_fn2(anchor, v ?? value, i ?? index, get_collection);
        return () => {
          items.delete(key);
        };
      })
    };
  }
  function move(effect2, next, anchor) {
    if (!effect2.nodes) return;
    var node = effect2.nodes.start;
    var end = effect2.nodes.end;
    var dest = next && (next.f & EFFECT_OFFSCREEN) === 0 ? (
      /** @type {EffectNodes} */
      next.nodes.start
    ) : anchor;
    while (node !== null) {
      var next_node = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      dest.before(node);
      if (node === end) {
        return;
      }
      node = next_node;
    }
  }
  function link(state2, prev, next) {
    if (prev === null) {
      state2.effect.first = next;
    } else {
      prev.next = next;
    }
    if (next === null) {
      state2.effect.last = prev;
    } else {
      next.prev = prev;
    }
  }
  function html(node, get_value, is_controlled = false, svg = false, mathml = false, skip_warning = false) {
    var anchor = node;
    var value = "";
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        node
      );
    }
    template_effect(() => {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      if (value === (value = get_value() ?? "")) {
        return;
      }
      if (is_controlled && true) {
        effect2.nodes = null;
        parent_node.innerHTML = /** @type {string} */
        value;
        if (value !== "") {
          assign_nodes(
            /** @type {TemplateNode} */
            /* @__PURE__ */ get_first_child(parent_node),
            /** @type {TemplateNode} */
            parent_node.lastChild
          );
        }
        return;
      }
      if (effect2.nodes !== null) {
        remove_effect_dom(
          effect2.nodes.start,
          /** @type {TemplateNode} */
          effect2.nodes.end
        );
        effect2.nodes = null;
      }
      if (value === "") return;
      var ns = svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : void 0;
      var wrapper = (
        /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
        create_element(svg ? "svg" : mathml ? "math" : "template", ns)
      );
      wrapper.innerHTML = /** @type {any} */
      value;
      var node2 = svg || mathml ? wrapper : (
        /** @type {HTMLTemplateElement} */
        wrapper.content
      );
      assign_nodes(
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(node2),
        /** @type {TemplateNode} */
        node2.lastChild
      );
      if (svg || mathml) {
        while (/* @__PURE__ */ get_first_child(node2)) {
          anchor.before(
            /** @type {TemplateNode} */
            /* @__PURE__ */ get_first_child(node2)
          );
        }
      } else {
        anchor.before(node2);
      }
    });
  }
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx$1() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }
  function clsx(value) {
    if (typeof value === "object") {
      return clsx$1(value);
    } else {
      return value ?? "";
    }
  }
  const whitespace = [..." 	\n\r\f \v\uFEFF"];
  function to_class(value, hash, directives) {
    var classname = value == null ? "" : "" + value;
    if (hash) {
      classname = classname ? classname + " " + hash : hash;
    }
    if (directives) {
      for (var key of Object.keys(directives)) {
        if (directives[key]) {
          classname = classname ? classname + " " + key : key;
        } else if (classname.length) {
          var len = key.length;
          var a = 0;
          while ((a = classname.indexOf(key, a)) >= 0) {
            var b = a + len;
            if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
              classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
            } else {
              a = b;
            }
          }
        }
      }
    }
    return classname === "" ? null : classname;
  }
  function to_style(value, styles) {
    return value == null ? null : String(value);
  }
  function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
    var prev = (
      /** @type {any} */
      dom[CLASS_CACHE]
    );
    if (prev !== value || prev === void 0) {
      var next_class_name = to_class(value, hash, next_classes);
      {
        if (next_class_name == null) {
          dom.removeAttribute("class");
        } else {
          dom.className = next_class_name;
        }
      }
      dom[CLASS_CACHE] = value;
    } else if (next_classes && prev_classes !== next_classes) {
      for (var key in next_classes) {
        var is_present = !!next_classes[key];
        if (prev_classes == null || is_present !== !!prev_classes[key]) {
          dom.classList.toggle(key, is_present);
        }
      }
    }
    return next_classes;
  }
  function set_style(dom, value, prev_styles, next_styles) {
    var prev = (
      /** @type {any} */
      dom[STYLE_CACHE]
    );
    if (prev !== value) {
      var next_style_attr = to_style(value);
      {
        if (next_style_attr == null) {
          dom.removeAttribute("style");
        } else {
          dom.style.cssText = next_style_attr;
        }
      }
      dom[STYLE_CACHE] = value;
    }
    return next_styles;
  }
  function select_option(select, value, mounting = false) {
    if (select.multiple) {
      if (value == void 0) {
        return;
      }
      if (!is_array(value)) {
        return select_multiple_invalid_value();
      }
      for (var option of select.options) {
        option.selected = value.includes(get_option_value(option));
      }
      return;
    }
    for (option of select.options) {
      var option_value = get_option_value(option);
      if (is(option_value, value)) {
        option.selected = true;
        return;
      }
    }
    if (!mounting || value !== void 0) {
      select.selectedIndex = -1;
    }
  }
  function init_select(select) {
    var observer = new MutationObserver(() => {
      select_option(select, select.__value);
    });
    observer.observe(select, {
      // Listen to option element changes
      childList: true,
      subtree: true,
      // because of <optgroup>
      // Listen to option element value attribute changes
      // (doesn't get notified of select value changes,
      // because that property is not reflected as an attribute)
      attributes: true,
      attributeFilter: ["value"]
    });
    teardown(() => {
      observer.disconnect();
    });
  }
  function bind_select_value(select, get2, set2 = get2) {
    var batches = /* @__PURE__ */ new WeakSet();
    var mounting = true;
    listen_to_event_and_reset_event(select, "change", (is_reset) => {
      var query = is_reset ? "[selected]" : ":checked";
      var value;
      if (select.multiple) {
        value = [].map.call(select.querySelectorAll(query), get_option_value);
      } else {
        var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
        select.querySelector("option:not([disabled])");
        value = selected_option && get_option_value(selected_option);
      }
      set2(value);
      select.__value = value;
      if (current_batch !== null) {
        batches.add(current_batch);
      }
    });
    effect(() => {
      var value = get2();
      if (select === document.activeElement) {
        var batch = (
          /** @type {Batch} */
          current_batch
        );
        if (batches.has(batch)) {
          return;
        }
      }
      select_option(select, value, mounting);
      if (mounting && value === void 0) {
        var selected_option = select.querySelector(":checked");
        if (selected_option !== null) {
          value = get_option_value(selected_option);
          set2(value);
        }
      }
      select.__value = value;
      mounting = false;
    });
    init_select(select);
  }
  function get_option_value(option) {
    if ("__value" in option) {
      return option.__value;
    } else {
      return option.value;
    }
  }
  const IS_CUSTOM_ELEMENT = Symbol("is custom element");
  const IS_HTML = Symbol("is html");
  function set_attribute(element, attribute, value, skip_warning) {
    var attributes = get_attributes(element);
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "loading") {
      element[LOADING_ATTR_SYMBOL] = value;
    }
    if (value == null) {
      element.removeAttribute(attribute);
    } else if (typeof value !== "string" && get_setters(element).includes(attribute)) {
      element[attribute] = value;
    } else {
      element.setAttribute(attribute, value);
    }
  }
  function get_attributes(element) {
    return (
      /** @type {Record<string | symbol, unknown>} **/
      /** @type {any} */
      element[ATTRIBUTES_CACHE] ?? (element[ATTRIBUTES_CACHE] = {
        [IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
        [IS_HTML]: element.namespaceURI === NAMESPACE_HTML
      })
    );
  }
  var setters_cache = /* @__PURE__ */ new Map();
  function get_setters(element) {
    var cache_key = element.getAttribute("is") || element.nodeName;
    var setters = setters_cache.get(cache_key);
    if (setters) return setters;
    setters_cache.set(cache_key, setters = []);
    var descriptors;
    var proto = element;
    var element_proto = Element.prototype;
    while (element_proto !== proto) {
      descriptors = get_descriptors(proto);
      for (var key in descriptors) {
        if (descriptors[key].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
        key !== "innerHTML" && key !== "textContent" && key !== "innerText") {
          setters.push(key);
        }
      }
      proto = get_prototype_of(proto);
    }
    return setters;
  }
  function bind_value(input, get2, set2 = get2) {
    var batches = /* @__PURE__ */ new WeakSet();
    listen_to_event_and_reset_event(input, "input", async (is_reset) => {
      var value = is_reset ? input.defaultValue : input.value;
      value = is_numberlike_input(input) ? to_number(value) : value;
      set2(value);
      if (current_batch !== null) {
        batches.add(current_batch);
      }
      await tick();
      if (value !== (value = get2())) {
        var start = input.selectionStart;
        var end = input.selectionEnd;
        var length = input.value.length;
        input.value = value ?? "";
        if (end !== null) {
          var new_length = input.value.length;
          if (start === end && end === length && new_length > length) {
            input.selectionStart = new_length;
            input.selectionEnd = new_length;
          } else {
            input.selectionStart = start;
            input.selectionEnd = Math.min(end, new_length);
          }
        }
      }
    });
    if (
      // If we are hydrating and the value has since changed,
      // then use the updated value from the input instead.
      // If defaultValue is set, then value == defaultValue
      // TODO Svelte 6: remove input.value check and set to empty string?
      untrack(get2) == null && input.value
    ) {
      set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
      if (current_batch !== null) {
        batches.add(current_batch);
      }
    }
    render_effect(() => {
      var value = get2();
      if (input === document.activeElement) {
        var batch = (
          /** @type {Batch} */
          current_batch
        );
        if (batches.has(batch)) {
          return;
        }
      }
      if (is_numberlike_input(input) && value === to_number(input.value)) {
        return;
      }
      if (input.type === "date" && !value && !input.value) {
        return;
      }
      if (value !== input.value) {
        input.value = value ?? "";
      }
    });
  }
  function is_numberlike_input(input) {
    var type = input.type;
    return type === "number" || type === "range";
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function is_bound_this(bound_value, element_or_component) {
    return bound_value === element_or_component || (bound_value == null ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component;
  }
  function bind_this(element_or_component = {}, update, get_value, get_parts) {
    var component_effect = (
      /** @type {ComponentContext} */
      component_context.r
    );
    var parent = (
      /** @type {Effect} */
      active_effect
    );
    effect(() => {
      var old_parts;
      var parts;
      render_effect(() => {
        old_parts = parts;
        parts = [];
        untrack(() => {
          if (!is_bound_this(get_value(...parts), element_or_component)) {
            update(element_or_component, ...parts);
            if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
              update(null, ...old_parts);
            }
          }
        });
      });
      return () => {
        let p = parent;
        while (p !== component_effect && p.parent !== null && p.parent.f & DESTROYING) {
          p = p.parent;
        }
        const teardown2 = () => {
          if (parts && is_bound_this(get_value(...parts), element_or_component)) {
            update(null, ...parts);
          }
        };
        const original_teardown = p.teardown;
        p.teardown = () => {
          teardown2();
          original_teardown == null ? void 0 : original_teardown();
        };
      };
    });
    return element_or_component;
  }
  function init(immutable = false) {
    const context = (
      /** @type {ComponentContextLegacy} */
      component_context
    );
    const callbacks = context.l.u;
    if (!callbacks) return;
    let props = () => deep_read_state(context.s);
    if (immutable) {
      let version = 0;
      let prev = (
        /** @type {Record<string, any>} */
        {}
      );
      const d = /* @__PURE__ */ derived(() => {
        let changed = false;
        const props2 = context.s;
        for (const key in props2) {
          if (props2[key] !== prev[key]) {
            prev[key] = props2[key];
            changed = true;
          }
        }
        if (changed) version++;
        return version;
      });
      props = () => get(d);
    }
    if (callbacks.b.length) {
      user_pre_effect(() => {
        observe_all(context, props);
        run_all(callbacks.b);
      });
    }
    user_effect(() => {
      const fns = untrack(() => callbacks.m.map(run));
      return () => {
        for (const fn of fns) {
          if (typeof fn === "function") {
            fn();
          }
        }
      };
    });
    if (callbacks.a.length) {
      user_effect(() => {
        observe_all(context, props);
        run_all(callbacks.a);
      });
    }
  }
  function observe_all(context, props) {
    if (context.l.s) {
      for (const signal of context.l.s) get(signal);
    }
    props();
  }
  function prop(props, key, flags2, fallback) {
    var _a2;
    var runes = !legacy_mode_flag || (flags2 & PROPS_IS_RUNES) !== 0;
    var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
    var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
    var fallback_value = (
      /** @type {V} */
      fallback
    );
    var fallback_dirty = true;
    var fallback_signal = (
      /** @type {Derived<V> | undefined} */
      void 0
    );
    var get_fallback = () => {
      if (lazy && runes) {
        fallback_signal ?? (fallback_signal = /* @__PURE__ */ derived(
          /** @type {() => V} */
          fallback
        ));
        return get(fallback_signal);
      }
      if (fallback_dirty) {
        fallback_dirty = false;
        fallback_value = lazy ? untrack(
          /** @type {() => V} */
          fallback
        ) : (
          /** @type {V} */
          fallback
        );
      }
      return fallback_value;
    };
    let setter;
    if (bindable) {
      var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
      setter = ((_a2 = get_descriptor(props, key)) == null ? void 0 : _a2.set) ?? (is_entry_props && key in props ? (v) => props[key] = v : void 0);
    }
    var initial_value;
    var is_store_sub = false;
    if (bindable) {
      [initial_value, is_store_sub] = capture_store_binding(() => (
        /** @type {V} */
        props[key]
      ));
    } else {
      initial_value = /** @type {V} */
      props[key];
    }
    if (initial_value === void 0 && fallback !== void 0) {
      initial_value = get_fallback();
      if (setter) {
        if (runes) props_invalid_value();
        setter(initial_value);
      }
    }
    var getter;
    if (runes) {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        return value;
      };
    } else {
      getter = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value !== void 0) {
          fallback_value = /** @type {V} */
          void 0;
        }
        return value === void 0 ? fallback_value : value;
      };
    }
    if (runes && (flags2 & PROPS_IS_UPDATED) === 0) {
      return getter;
    }
    if (setter) {
      var legacy_parent = props.$$legacy;
      return (
        /** @type {() => V} */
        function(value, mutation) {
          if (arguments.length > 0) {
            if (!runes || !mutation || legacy_parent || is_store_sub) {
              setter(mutation ? getter() : value);
            }
            return value;
          }
          return getter();
        }
      );
    }
    var overridden = false;
    var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
      overridden = false;
      return getter();
    });
    if (bindable) get(d);
    var parent_effect = (
      /** @type {Effect} */
      active_effect
    );
    return (
      /** @type {() => V} */
      function(value, mutation) {
        if (arguments.length > 0) {
          const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
          set(d, new_value);
          overridden = true;
          if (fallback_value !== void 0) {
            fallback_value = new_value;
          }
          return value;
        }
        if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
          return d.v;
        }
        return get(d);
      }
    );
  }
  const PUBLIC_VERSION = "5";
  if (typeof window !== "undefined") {
    ((_b = window.__svelte ?? (window.__svelte = {})).v ?? (_b.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
  }
  const STORAGE_KEY = "skoolTheme";
  const THEMES = [
    { id: "default", label: "Default theme" },
    { id: "discord", label: "Discord theme" },
    { id: "minimax", label: "MiniMax (light)" }
  ];
  const VALID = new Set(THEMES.map((t) => t.id));
  function loadTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && VALID.has(
        /** @type {ThemeId} */
        saved
      )) {
        return (
          /** @type {ThemeId} */
          saved
        );
      }
    } catch {
    }
    return "default";
  }
  function saveTheme(theme) {
    try {
      if (theme === "default") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, theme);
    } catch {
    }
  }
  var root$g = /* @__PURE__ */ from_html(`<option> </option>`);
  var root_1$e = /* @__PURE__ */ from_html(`<select class="sortsel themesel" aria-label="Color theme"></select>`);
  function ThemeSelect($$anchor, $$props) {
    push($$props, true);
    var select = root_1$e();
    each(
      select,
      21,
      () => THEMES,
      (theme) => theme.id,
      ($$anchor2, theme) => {
        var option = root$g();
        var text2 = child(option);
        var option_value = {};
        template_effect(() => {
          set_text(text2, get(theme).label);
          if (option_value !== (option_value = get(theme).id)) {
            option.value = (option.__value = get(theme).id) ?? "";
          }
        });
        append($$anchor2, option);
      }
    );
    var select_value;
    init_select(select);
    template_effect(() => {
      if (select_value !== (select_value = $$props.value)) {
        select.value = (select.__value = $$props.value) ?? "", select_option(select, $$props.value);
      }
    });
    delegated("change", select, (e) => $$props.onChange(e.currentTarget.value));
    append($$anchor, select);
    pop();
  }
  delegate(["change"]);
  var root$f = /* @__PURE__ */ from_html(`<img alt="" loading="lazy"/>`);
  var root_1$d = /* @__PURE__ */ from_html(`<div aria-hidden="true"></div>`);
  function Avatar($$anchor, $$props) {
    let src = prop($$props, "src", 3, ""), size = prop($$props, "size", 3, "md"), level = prop($$props, "level", 3, 0), authorName = prop($$props, "authorName", 3, "");
    let failed = /* @__PURE__ */ state(false);
    const sizeClass = { xs: "avatar xs", sm: "avatar sm", md: "avatar" };
    var wrap = document.createElement("div");
    wrap.className = "avatar-wrap";
    const _avSizes = { xs: 28, sm: 30, md: 40 };
    var avFrag = comment$1();
    var avNode = first_child(avFrag);
    {
      var consequent = ($$anchor2) => {
        var img = root$f();
        template_effect(() => {
          set_class(img, 1, clsx(sizeClass[size()]));
          set_attribute(img, "src", src());
        });
        event("error", img, () => set(failed, true));
        append($$anchor2, img);
      };
      var alternate = ($$anchor2) => {
        var div = root_1$d();
        template_effect(() => set_class(div, 1, clsx(sizeClass[size()])));
        append($$anchor2, div);
      };
      if_block(avNode, ($$render) => {
        if (src() && !get(failed)) $$render(consequent);
        else $$render(alternate, -1);
      });
    }
    wrap.append(avFrag);
    var badge = document.createElement("span");
    badge.className = "level-badge";
    badge.style.cssText = "position:absolute;min-width:14px;height:14px;padding:0 3px;box-sizing:border-box;border-radius:999px;background:#1d6ce0;color:#fff;font-size:9px;font-weight:700;line-height:14px;text-align:center;pointer-events:none;z-index:2;";
    render_effect(() => {
      const sz = _avSizes[size()] || 40;
      wrap.style.cssText = `position:relative;flex:none;display:inline-block;width:${sz}px;height:${sz}px;overflow:visible;`;
      const lv = level() || get(memberLevelMap).get((authorName() || "").toLowerCase()) || 0;
      badge.textContent = String(lv);
      badge.hidden = lv <= 0;
      // Pin badge to bottom-right of the avatar circle (calculated from size)
      badge.style.top = (sz - 14 + 3) + "px";
      badge.style.left = (sz - 14 + 4) + "px";
    });
    wrap.appendChild(badge);
    append($$anchor, wrap);
  }
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function shortDate(iso) {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      const parts = String(iso).split("-");
      const month = Number(parts[1]);
      return month >= 1 && month <= 12 ? `${MONTHS[month - 1]} ${Number(parts[2]) || ""}`.trim() : "";
    }
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
  }
  function relativeTime(iso) {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return shortDate(iso);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "now";
    if (diffMin < 60) return diffMin + "m";
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return diffH + "h";
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return diffD + "d";
    return shortDate(iso);
  }
  function commentTime(iso) {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return String(iso);
    let hours = date.getHours();
    const meridiem = hours < 12 ? "AM" : "PM";
    hours = hours % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${hours}:${minutes} ${meridiem}`;
  }
  function compactCount(value) {
    const n = Number(value) || 0;
    if (n < 1e3) return String(n);
    if (n < 1e6) return `${trim(n / 1e3)}k`;
    return `${trim(n / 1e6)}m`;
  }
  function trim(n) {
    return n.toFixed(1).replace(/\.0$/, "");
  }
  var root$e = /* @__PURE__ */ from_html(`<div class="notif-empty">Loading…</div>`);
  var root_1$c = /* @__PURE__ */ from_html(`<div class="notif-empty">Couldn’t load notifications. Try again.</div>`);
  var root_2$7 = /* @__PURE__ */ from_html(`<div class="notif-empty">You’re all caught up.</div>`);
  var root_3$6 = /* @__PURE__ */ from_html(`<div class="notif-preview"> </div>`);
  var root_4$4 = /* @__PURE__ */ from_html(`<a><!> <div class="notif-body"><div class="notif-text"><strong> </strong> </div> <!> <div class="notif-time"> </div></div></a>`);
  var root_5$2 = /* @__PURE__ */ from_html(`<button class="btn sm notif-more" type="button"> </button>`);
  var root_6$2 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  var root_7$2 = /* @__PURE__ */ from_html(`<div class="notif-panel" role="dialog" aria-label="Notifications"><div class="notif-head"><span>Notifications</span> <button class="iconbtn notif-close" type="button" aria-label="Close notifications">×</button></div> <div class="notif-list"><!></div></div>`);
  function NotificationPanel($$anchor, $$props) {
    push($$props, true);
    let items = prop($$props, "items", 19, () => []), status = prop($$props, "status", 3, "idle"), hasMore = prop($$props, "hasMore", 3, false);
    function handleClick(e, n) {
      var _a2;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      (_a2 = $$props.onOpen) == null ? void 0 : _a2.call($$props, n);
    }
    var div = root_7$2();
    var div_1 = child(div);
    var button = sibling(child(div_1), 2);
    const markAllBtn = document.createElement("button");
    markAllBtn.className = "notif-markall";
    markAllBtn.type = "button";
    markAllBtn.textContent = "Mark all as read";
    div_1.insertBefore(markAllBtn, button);
    markAllBtn.addEventListener("click", () => {
      var _b2 = $$props.onMarkAllRead;
      if (_b2 != null) _b2.call($$props);
    });
    var div_2 = sibling(div_1, 2);
    var node = child(div_2);
    {
      var consequent = ($$anchor2) => {
        var div_3 = root$e();
        append($$anchor2, div_3);
      };
      var consequent_1 = ($$anchor2) => {
        var div_4 = root_1$c();
        append($$anchor2, div_4);
      };
      var consequent_2 = ($$anchor2) => {
        var div_5 = root_2$7();
        append($$anchor2, div_5);
      };
      var alternate = ($$anchor2) => {
        var fragment = root_6$2();
        var node_1 = first_child(fragment);
        each(node_1, 17, () => {
          const all = items();
          return [...all.filter((x) => x.unread), ...all.filter((x) => !x.unread)];
        }, (n) => n.id, ($$anchor3, n) => {
          var a = root_4$4();
          let classes;
          var node_2 = child(a);
          Avatar(node_2, {
            get src() {
              return get(n).actorAvatar;
            },
            size: "sm"
          });
          var div_6 = sibling(node_2, 2);
          var div_7 = child(div_6);
          var strong = child(div_7);
          var text2 = child(strong);
          var text_1 = sibling(strong);
          var node_3 = sibling(div_7, 2);
          {
            var consequent_3 = ($$anchor4) => {
              var div_8 = root_3$6();
              var text_2 = child(div_8);
              template_effect(() => set_text(text_2, get(n).preview));
              append($$anchor4, div_8);
            };
            if_block(node_3, ($$render) => {
              if (get(n).preview) $$render(consequent_3);
            });
          }
          var div_9 = sibling(node_3, 2);
          var text_3 = child(div_9);
          const dotBtn = document.createElement("button");
          dotBtn.type = "button";
          dotBtn.className = "notif-dot";
          dotBtn.title = "Toggle read / unread";
          a.appendChild(dotBtn);
          template_effect(
            ($0) => {
              classes = set_class(a, 1, "notif-item", null, classes, { unread: get(n).unread });
              set_attribute(a, "href", get(n).href);
              set_text(text2, get(n).actorName);
              set_text(text_1, ` ${get(n).text ?? ""}`);
              set_text(text_3, $0);
              dotBtn.classList.toggle("is-unread", get(n).unread);
            },
            [() => commentTime(get(n).ts)]
          );
          dotBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            var _b2 = $$props.onToggle;
            if (_b2 != null) _b2.call($$props, get(n));
          }, true);
          delegated("click", a, (e) => handleClick(e, get(n)));
          append($$anchor3, a);
        });
        var node_4 = sibling(node_1, 2);
        {
          var consequent_4 = ($$anchor3) => {
            var button_1 = root_5$2();
            var text_4 = child(button_1);
            template_effect(() => {
              button_1.disabled = status() === "loading";
              set_text(text_4, status() === "loading" ? "Loading…" : "Load more");
            });
            delegated("click", button_1, function(...$$args) {
              var _a2;
              (_a2 = $$props.onLoadMore) == null ? void 0 : _a2.apply(this, $$args);
            });
            append($$anchor3, button_1);
          };
          if_block(node_4, ($$render) => {
            if (hasMore()) $$render(consequent_4);
          });
        }
        append($$anchor2, fragment);
      };
      if_block(node, ($$render) => {
        if (status() === "loading" && items().length === 0) $$render(consequent);
        else if (status() === "error" && items().length === 0) $$render(consequent_1, 1);
        else if (items().length === 0) $$render(consequent_2, 2);
        else $$render(alternate, -1);
      });
    }
    delegated("click", button, function(...$$args) {
      var _a2;
      (_a2 = $$props.onClose) == null ? void 0 : _a2.apply(this, $$args);
    });
    append($$anchor, div);
    pop();
  }
  delegate(["click"]);
  var root$d = /* @__PURE__ */ from_html(`<span class="notif-badge"> </span>`);
  var root_1$b = /* @__PURE__ */ from_html(`<header class="topbar"><div class="topbar-left"><button class="iconbtn exitbtn" type="button" aria-label="Back to Skool — return to the native view" title="Return to native Skool — the toolbar icon (Alt+S) reopens this view"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg></button> <div class="brand"><span class="brand-mark">▣</span> <span> </span></div></div> <nav class="tabs" aria-label="Views"><button type="button" class="active" aria-current="page">Feed</button></nav> <div class="topbar-right"><button class="iconbtn" type="button" aria-label="Refresh feed" title="Refresh — reload posts and comments"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.75 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.15.69 4.24 1.78L13 11h7V4z"></path></svg></button> <div class="notif-wrap"><button class="iconbtn" type="button" title="Notifications"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1z"></path></svg> <!></button> <!></div> <button class="iconbtn" type="button" disabled="" aria-label="Chat — coming in a later version" title="Chat — coming soon"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg></button> <div class="zoom-controls" title="Page zoom (this view only)"><button class="iconbtn zoom-btn" type="button" aria-label="Zoom out">−</button> <span class="zoom-label"> </span> <button class="iconbtn zoom-btn" type="button" aria-label="Zoom in">+</button></div> <!></div></header>`);
  function Topbar($$anchor, $$props) {
    push($$props, true);
    let zoom = prop($$props, "zoom", 3, 100), notifItems = prop($$props, "notifItems", 19, () => []), notifStatus = prop($$props, "notifStatus", 3, "idle"), notifHasMore = prop($$props, "notifHasMore", 3, false), unreadCount = prop($$props, "unreadCount", 3, 0);
    let notifOpen = /* @__PURE__ */ state(false);
    function toggleNotif() {
      var _a2;
      set(notifOpen, !get(notifOpen));
      // Only fetch from server on first open (when list is empty); after that keep local state.
      if (get(notifOpen) && notifItems().length === 0) {
        (_a2 = $$props.onOpenNotifications) == null ? void 0 : _a2.call($$props);
      }
    }
    var header = root_1$b();
    var div = child(header);
    var button = child(div);
    var div_1 = sibling(button, 2);
    var span = sibling(child(div_1), 2);
    var text2 = child(span);
    // Voeg logo-img toe aan brand-mark zonder de node-traversal te verstoren
    var brandMarkSpan = child(div_1);
    var groupIconImg = document.createElement("img");
    groupIconImg.className = "group-icon";
    groupIconImg.hidden = true;
    brandMarkSpan.prepend(groupIconImg);
    var div_2 = sibling(div, 4);
    var button_1 = child(div_2);
    var div_3 = sibling(button_1, 2);
    var button_2 = child(div_3);
    var node = sibling(child(button_2), 2);
    {
      var consequent = ($$anchor2) => {
        var span_1 = root$d();
        var text_1 = child(span_1);
        template_effect(() => set_text(text_1, unreadCount()));
        append($$anchor2, span_1);
      };
      if_block(node, ($$render) => {
        if (unreadCount() > 0) $$render(consequent);
      });
    }
    var node_1 = sibling(button_2, 2);
    {
      var consequent_1 = ($$anchor2) => {
        NotificationPanel($$anchor2, {
          get items() {
            return notifItems();
          },
          get status() {
            return notifStatus();
          },
          get hasMore() {
            return notifHasMore();
          },
          get onLoadMore() {
            return $$props.onLoadMoreNotifications;
          },
          onOpen: (n) => {
            var _a2;
            set(notifOpen, false);
            (_a2 = $$props.onOpenNotification) == null ? void 0 : _a2.call($$props, n);
          },
          onToggle: (n) => {
            var _b2 = $$props.onToggleNotification;
            if (_b2 != null) _b2.call($$props, n);
          },
          onMarkAllRead: () => {
            var _b2 = $$props.onMarkAllReadNotifications;
            if (_b2 != null) _b2.call($$props);
          },
          onClose: () => set(notifOpen, false)
        });
      };
      if_block(node_1, ($$render) => {
        if (get(notifOpen)) $$render(consequent_1);
      });
    }
    var div_4 = sibling(div_3, 4);
    var button_3 = child(div_4);
    var span_2 = sibling(button_3, 2);
    var text_2 = child(span_2);
    var button_4 = sibling(span_2, 2);
    var node_2 = sibling(div_4, 2);
    ThemeSelect(node_2, {
      get value() {
        return $$props.theme;
      },
      get onChange() {
        return $$props.onThemeChange;
      }
    });
    template_effect(() => {
      set_text(text2, $$props.groupName);
      const icon = $$props.groupIcon || "";
      groupIconImg.src = icon;
      groupIconImg.alt = icon ? ($$props.groupName || "") : "";
      groupIconImg.hidden = !icon;
      // Verberg de ▣ tekst als er een echt logo is
      const brandText = brandMarkSpan.childNodes[1];
      if (brandText) brandText.nodeValue = icon ? "" : "▣";
      set_attribute(button_2, "aria-label", `Notifications${unreadCount() ? `, ${unreadCount()} unread` : ""}`);
      set_attribute(button_2, "aria-expanded", get(notifOpen));
      set_text(text_2, `${zoom() ?? ""}%`);
    });
    delegated("click", button, function(...$$args) {
      var _a2;
      (_a2 = $$props.onExit) == null ? void 0 : _a2.apply(this, $$args);
    });
    delegated("click", button_1, function(...$$args) {
      var _a2;
      (_a2 = $$props.onRefresh) == null ? void 0 : _a2.apply(this, $$args);
    });
    delegated("click", button_2, toggleNotif);
    delegated("click", button_3, function(...$$args) {
      var _a2;
      (_a2 = $$props.onZoomOut) == null ? void 0 : _a2.apply(this, $$args);
    });
    delegated("click", button_4, function(...$$args) {
      var _a2;
      (_a2 = $$props.onZoomIn) == null ? void 0 : _a2.apply(this, $$args);
    });
    // Click-outside: close notification panel when clicking anywhere outside .notif-wrap
    const _closeNotifOnOutside = (e) => {
      if (!get(notifOpen)) return;
      const path = typeof e.composedPath === "function" ? e.composedPath() : [e.target];
      if (!path.some((el) => el === div_3 || (el instanceof Element && el.classList && el.classList.contains("notif-panel")))) {
        set(notifOpen, false);
      }
    };
    user_effect(() => {
      document.addEventListener("click", _closeNotifOnOutside, true);
      return () => document.removeEventListener("click", _closeNotifOnOutside, true);
    });
    append($$anchor, header);
    pop();
  }
  delegate(["click"]);
  // Override-map: houdt actuele likes/comments bij per post-id, zodat PostRow altijd de juiste waarden toont
  const _postStatOverrides = /* @__PURE__ */ state(new Map());
  const _prefetchedIds = new Set();
  let _onFeedReady = null;
  let _onFeedProgress = null;
  let _scrollListenerAttached = false;
  let _listpaneScrollEl = null;
  let _listpaneScrollHandler = null;
  let _abortActiveCrawl = null;
  let _zoomLabelTimer = null;
  let _allFeedPosts = [];
  // Stat-persistentie: correcte tellingen opslaan zodat herlaad meteen juiste waarden toont
  const _STAT_CACHE_KEY = "sv-stat-overrides";
  let _statPersistTimer = null;
  let _statPersistData = {};
  function _persistStatOverride(id, upvotes, comments) {
    _statPersistData[id] = { u: upvotes, c: comments };
    if (_statPersistTimer) clearTimeout(_statPersistTimer);
    _statPersistTimer = setTimeout(() => {
      browser.storage.local.set({ [_STAT_CACHE_KEY]: _statPersistData }).catch(() => {});
      _statPersistTimer = null;
    }, 1500);
  }
  async function _loadAndApplyStatCache() {
    try {
      const got = await browser.storage.local.get(_STAT_CACHE_KEY);
      const data = got?.[_STAT_CACHE_KEY] ?? {};
      _statPersistData = data;
      const entries = Object.entries(data);
      if (entries.length === 0) return;
      const m = new Map();
      for (const [id, stats] of entries) {
        m.set(id, { upvotes: stats.u, comments: stats.c });
      }
      set(_postStatOverrides, m, true);
    } catch (e) {
      console.warn("[sv-stat] stat-cache laden mislukt:", e);
    }
  }
  async function _prefetchOne(p, bid, sl) {
    try {
      const { post: post2 } = await getPost({ buildId: bid, slug: sl, postSlug: p.slug });
      if (post2) {
        const uv = typeof post2.upvotes === "number" ? post2.upvotes : null;
        const cm = typeof post2.comments === "number" ? post2.comments : null;
        if (uv != null || cm != null) setPostStatOverride(p.id, uv, cm);
        console.log("[sv-level]", post2.author.name, "level:", post2.author.level, "mapSize:", get(memberLevelMap).size);
      }
    } catch (err) {
      console.warn("[sv-stat] prefetch FOUT:", p.id.slice(0, 8), err?.message);
    }
  }
  async function _prefetchBatch(posts, bid, sl, batchSize) {
    const withSlug = posts.filter((p) => p.slug);
    const notFetched = withSlug.filter((p) => !_prefetchedIds.has(p.id));
    const toFetch = notFetched.slice(0, batchSize);
    if (toFetch.length === 0) return;
    toFetch.forEach((p) => _prefetchedIds.add(p.id));
    // Eerste 5 posts parallel ophalen (meteen zichtbaar)
    const first = toFetch.slice(0, 5);
    const rest = toFetch.slice(5);
    await Promise.all(first.map((p) => _prefetchOne(p, bid, sl)));
    // Rest in batches van 3 met pauze (rustig laden op de achtergrond)
    for (let i = 0; i < rest.length; i += 3) {
      await new Promise((r) => setTimeout(r, 300));
      await Promise.all(rest.slice(i, i + 3).map((p) => _prefetchOne(p, bid, sl)));
    }
  }
  function setPostStatOverride(id, upvotes, comments) {
    const m = new Map(get(_postStatOverrides));
    const cur = m.get(id) || {};
    const next = {
      upvotes: upvotes != null ? upvotes : cur.upvotes,
      comments: comments != null ? comments : cur.comments
    };
    m.set(id, next);
    set(_postStatOverrides, m, true);
    _persistStatOverride(id, next.upvotes, next.comments);
  }
  var root$c = /* @__PURE__ */ from_html(`<div class="rcat"><span class="catchip"> </span></div>`);
  var root_1$a = /* @__PURE__ */ from_html(`<div role="button" tabindex="0"><button type="button">📌</button> <div class="rmain"><div class="rtitle"> </div> <!> <div class="rmeta"><!> <span class="rname"> </span> <span class="rstat"> </span></div></div></div>`);
  function PostRow($$anchor, $$props) {
    push($$props, true);
    const fromPin = (e) => e.target instanceof Element && e.target.closest(".pinbtn") != null;
    var div = root_1$a();
    let classes;
    var button = child(div);
    let classes_1;
    var div_1 = sibling(button, 2);
    var div_2 = child(div_1);
    var text2 = child(div_2);
    var node = sibling(div_2, 2);
    var prevEl = document.createElement("p");
    prevEl.className = "rprev";
    div_2.after(prevEl);
    {
      var consequent = ($$anchor2) => {
        var div_3 = root$c();
        var span = child(div_3);
        var text_1 = child(span);
        template_effect(() => set_text(text_1, $$props.categoryName));
        append($$anchor2, div_3);
      };
      if_block(node, ($$render) => {
        if ($$props.categoryName) $$render(consequent);
      });
    }
    var div_4 = sibling(node, 2);
    var node_1 = child(div_4);
    Avatar(node_1, {
      get src() {
        return $$props.post.author.avatar;
      },
      get level() {
        return $$props.post.author.level || 0;
      },
      get authorName() {
        return $$props.post.author.name || "";
      },
      size: "xs"
    });
    var span_1 = sibling(node_1, 2);
    var text_2 = child(span_1);
    var span_2 = sibling(span_1, 2);
    var text_3 = child(span_2);
    template_effect(
      ($0, $1, $2) => {
        classes = set_class(div, 1, "row", null, classes, { selected: $$props.selected });
        set_attribute(div, "aria-label", `Open post: ${$$props.post.title}`);
        set_attribute(div, "aria-current", $$props.selected ? "true" : void 0);
        classes_1 = set_class(button, 1, "pinbtn", null, classes_1, { on: $$props.pinned });
        button.disabled = $$props.nativePinned;
        set_attribute(button, "aria-pressed", $$props.pinned);
        set_attribute(button, "title", $$props.nativePinned ? "Pinned by Skool" : $$props.pinned ? "Unpin (local)" : "Pin (local)");
        set_attribute(button, "aria-label", $$props.nativePinned ? "Pinned by Skool" : `${$$props.pinned ? "Unpin" : "Pin"} post (local)`);
        set_text(text2, $$props.post.title);
        set_text(text_2, $$props.post.author.name);
        set_text(text_3, `· ${$0 ?? ""} · 👍${$1 ?? ""} · 💬${$2 ?? ""}`);
        div.dataset.svPostId = $$props.post.id;
        span_2.dataset.svT = $0 ?? "";
      },
      [
        () => relativeTime($$props.post.created),
        () => { const ov = get(_postStatOverrides).get($$props.post.id); return compactCount(ov?.upvotes ?? $$props.post.upvotes); },
        () => { const ov = get(_postStatOverrides).get($$props.post.id); return compactCount(ov?.comments ?? $$props.post.comments); }
      ]
    );
    render_effect(() => {
      const txt = ($$props.post.contentText || "").trim();
      prevEl.textContent = txt.length > 110 ? txt.slice(0, 110) + "…" : txt;
      prevEl.hidden = !txt;
    });
    delegated("click", div, (e) => {
      if (fromPin(e)) return;
      $$props.onSelect($$props.post.id);
    });
    delegated("keydown", div, (e) => {
      if (fromPin(e)) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $$props.onSelect($$props.post.id);
      }
    });
    delegated("click", button, (e) => {
      e.stopPropagation();
      $$props.onTogglePin($$props.post.id);
    });
    append($$anchor, div);
    pop();
  }
  delegate(["click", "keydown"]);
  var root$b = /* @__PURE__ */ from_html(`<option> </option>`);
  var root_1$9 = /* @__PURE__ */ from_html(`<select class="sortsel" aria-label="Filter by category"><option>All categories</option><!></select>`);
  function CategorySelect($$anchor, $$props) {
    push($$props, true);
    var select = root_1$9();
    var option = child(select);
    option.value = option.__value = "";
    var node = sibling(option);
    each(node, 17, () => $$props.categories, (category) => category.id, ($$anchor2, category) => {
      var option_1 = root$b();
      var text2 = child(option_1);
      var option_1_value = {};
      template_effect(() => {
        set_text(text2, get(category).name);
        if (option_1_value !== (option_1_value = get(category).id)) {
          option_1.value = (option_1.__value = get(category).id) ?? "";
        }
      });
      append($$anchor2, option_1);
    });
    var select_value;
    init_select(select);
    template_effect(() => {
      if (select_value !== (select_value = $$props.value)) {
        select.value = (select.__value = $$props.value) ?? "", select_option(select, $$props.value);
      }
    });
    delegated("change", select, (e) => $$props.onChange(e.currentTarget.value));
    append($$anchor, select);
    pop();
  }
  delegate(["change"]);
  const SORT_MODES = (
    /** @type {const} */
    [
      { value: "newest", label: "Newest" },
      { value: "oldest", label: "Oldest" },
      { value: "likes", label: "Most Liked" },
      { value: "comments", label: "Most Commented" },
      { value: "gems", label: "Hidden Gems" }
    ]
  );
  const GEM_MIN_AGE_DAYS = 45;
  const GEM_MIN_UPVOTES = 20;
  const DAY_MS = 864e5;
  function createdMs(post2) {
    const t = Date.parse(post2.created);
    return Number.isNaN(t) ? 0 : t;
  }
  function ageDays(post2, now) {
    return (now - createdMs(post2)) / DAY_MS;
  }
  function filterByCategory(posts, labelId) {
    if (!labelId) return posts.slice();
    return posts.filter((p) => p.labelId === labelId);
  }
  function sortPosts(posts, mode, now = Date.now()) {
    const arr = posts.slice();
    switch (mode) {
      case "oldest":
        return arr.sort((a, b) => createdMs(a) - createdMs(b));
      case "likes":
        return arr.sort((a, b) => b.upvotes - a.upvotes);
      case "comments":
        return arr.sort((a, b) => b.comments - a.comments);
      case "gems":
        return arr.filter((p) => ageDays(p, now) > GEM_MIN_AGE_DAYS && p.upvotes >= GEM_MIN_UPVOTES).sort((a, b) => b.upvotes - a.upvotes);
      case "newest":
      default:
        return arr.sort((a, b) => createdMs(b) - createdMs(a));
    }
  }
  var root$a = /* @__PURE__ */ from_html(`<option> </option>`);
  var root_1$8 = /* @__PURE__ */ from_html(`<select class="sortsel" aria-label="Sort posts"></select>`);
  function SortSelect($$anchor, $$props) {
    push($$props, true);
    var select = root_1$8();
    each(
      select,
      21,
      () => SORT_MODES,
      (mode) => mode.value,
      ($$anchor2, mode) => {
        var option = root$a();
        var text2 = child(option);
        var option_value = {};
        template_effect(() => {
          set_text(text2, get(mode).label);
          if (option_value !== (option_value = get(mode).value)) {
            option.value = (option.__value = get(mode).value) ?? "";
          }
        });
        append($$anchor2, option);
      }
    );
    var select_value;
    init_select(select);
    template_effect(() => {
      if (select_value !== (select_value = $$props.value)) {
        select.value = (select.__value = $$props.value) ?? "", select_option(select, $$props.value);
      }
    });
    delegated("change", select, (e) => $$props.onChange(e.currentTarget.value));
    append($$anchor, select);
    pop();
  }
  delegate(["change"]);
  var root$9 = /* @__PURE__ */ from_html(`<div class="empty"> <br/> <button class="btn sm" type="button">Retry</button></div>`);
  var root_1$7 = /* @__PURE__ */ from_html(`<div class="empty">Loading…</div>`);
  var root_2$6 = /* @__PURE__ */ from_html(`<div class="empty">No posts in this category yet.</div>`);
  var root_3$5 = /* @__PURE__ */ from_html(`<select class="pinned-sort-sel" title="Sort pinned posts" aria-label="Sort order for pinned posts"><option>Default order</option><option>Newest first</option><option>Oldest first</option><option>A → Z</option></select>`);
  var root_4$3 = /* @__PURE__ */ from_html(`<div class="listdiv">All posts</div>`);
  var root_5$1 = /* @__PURE__ */ from_html(`<div class="listdiv pinned-header"><button class="pinned-toggle" type="button"> <span>▾</span></button> <!></div> <!> <!>`, 1);
  var root_6$1 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  var root_7$1 = /* @__PURE__ */ from_html(`<aside class="listpane"><div class="listhead"><span class="sub"><!></span> <div class="lh-controls"><!> <!></div> <div class="search-wrap"><input class="search-input" type="search" placeholder="Search posts…" aria-label="Search posts"/> <!></div></div> <div class="list"><!></div> <div><span> </span></div></aside>`);
  var root_search_clear = /* @__PURE__ */ from_html(`<button class="search-clear" type="button" aria-label="Clear search">\xD7</button>`);
  function FeedList($$anchor, $$props) {
    push($$props, true);
    let listWidth = prop($$props, "listWidth", 3, 400);
    const INITIAL_WINDOW = 30;
    const WINDOW_STEP = 30;
    let windowSize = /* @__PURE__ */ state(INITIAL_WINDOW);
    let paneEl = /* @__PURE__ */ state(void 0);
    let listEl = /* @__PURE__ */ state(void 0);
    let sentinelEl = /* @__PURE__ */ state(void 0);
    const categoryNameById = /* @__PURE__ */ user_derived(() => new Map($$props.categories.map((c) => [c.id, c.name])));
    const nameFor = (post2) => post2.labelId ? get(categoryNameById).get(post2.labelId) ?? "" : "";
    const pinned = /* @__PURE__ */ user_derived(() => $$props.store.posts.filter((p) => $$props.store.isPinned(p)));
    let pinnedCollapsed = /* @__PURE__ */ state(true);
    let pinnedSort = /* @__PURE__ */ state("default");
    let searchQuery = /* @__PURE__ */ state("");
    user_effect(() => { set(activeSearchQuery, get(searchQuery).trim()); });
    const isSearching = /* @__PURE__ */ user_derived(() => get(searchQuery).trim().length > 0);
    const searchResults = /* @__PURE__ */ user_derived(() => {
      if (!get(isSearching)) return [];
      const q = get(searchQuery).trim().toLowerCase();
      return $$props.store.posts.filter((p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.contentText || "").toLowerCase().includes(q) ||
        ((p.author && p.author.name) || "").toLowerCase().includes(q)
      );
    });
    const sortedPinned = /* @__PURE__ */ user_derived(() => {
      const arr = [...get(pinned)];
      if (get(pinnedSort) === "alpha") arr.sort((a, b) => a.title.localeCompare(b.title));
      if (get(pinnedSort) === "newest") arr.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      if (get(pinnedSort) === "oldest") arr.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
      return arr;
    });
    const unpinned = /* @__PURE__ */ user_derived(() => $$props.store.posts.filter((p) => !$$props.store.isPinned(p)));
    const visibleUnpinned = /* @__PURE__ */ user_derived(() => get(unpinned).slice(0, get(windowSize)));
    const hasMoreWindow = /* @__PURE__ */ user_derived(() => get(windowSize) < get(unpinned).length);
    const total = /* @__PURE__ */ user_derived(() => $$props.store.posts.length);
    user_effect(() => {
      void $$props.store.sort;
      void $$props.store.category;
      set(windowSize, INITIAL_WINDOW);
      set(searchQuery, "");
      if (get(paneEl)) get(paneEl).scrollTop = 0;
    });
    function growIfNeeded() {
      if (!get(listEl) || !get(paneEl) || !get(hasMoreWindow)) return;
      requestAnimationFrame(() => {
        if (!get(listEl) || !get(paneEl) || !get(hasMoreWindow)) return;
        if (get(listEl).scrollHeight <= get(paneEl).clientHeight) {
          set(windowSize, get(windowSize) + WINDOW_STEP);
        }
      });
    }
    user_effect(() => {
      void get(visibleUnpinned).length;
      void $$props.store.status;
      growIfNeeded();
    });
    user_effect(() => {
      if (!get(sentinelEl) || !get(paneEl)) return;
      const observer = new IntersectionObserver(
        (entries) => {
          var _a2;
          if (((_a2 = entries[0]) == null ? void 0 : _a2.isIntersecting) && get(hasMoreWindow)) set(windowSize, get(windowSize) + WINDOW_STEP);
        },
        { root: get(paneEl), rootMargin: "200px" }
      );
      observer.observe(get(sentinelEl));
      return () => observer.disconnect();
    });
    user_effect(() => {
      if ($$props.store.status === "idle") void $$props.store.start();
    });
    var aside = root_7$1();
    var div = child(aside);
    var span = child(div);
    var node = child(span);
    {
      var consequent = ($$anchor2) => {
        var text$1 = text();
        template_effect(() => set_text(text$1, `indexing ${$$props.store.indexed ?? ""}…`));
        append($$anchor2, text$1);
      };
      var consequent_1 = ($$anchor2) => {
        var text_1 = text();
        template_effect(() => set_text(text_1, `${get(total) ?? ""} ${get(total) === 1 ? "post" : "posts"}`));
        append($$anchor2, text_1);
      };
      if_block(node, ($$render) => {
        if ($$props.store.isCrawling && get(total) > 0) $$render(consequent);
        else if (get(total)) $$render(consequent_1, 1);
      });
    }
    var div_1 = sibling(span, 2);
    var node_1 = child(div_1);
    CategorySelect(node_1, {
      get categories() {
        return $$props.categories;
      },
      get value() {
        return $$props.store.category;
      },
      onChange: (id) => $$props.store.setCategory(id)
    });
    var node_2 = sibling(node_1, 2);
    SortSelect(node_2, {
      get value() {
        return $$props.store.sort;
      },
      onChange: (s) => $$props.store.setSort(s)
    });
    var search_wrap = sibling(div_1, 2);
    var search_input = child(search_wrap);
    var search_clear_anchor = sibling(search_input, 2);
    bind_value(search_input, () => get(searchQuery), ($$value) => set(searchQuery, $$value));
    search_input.addEventListener("search", () => { if (!search_input.value) set(searchQuery, ""); });
    {
      var render_clear = ($$anchor_sc) => {
        var btn_clear = root_search_clear();
        delegated("click", btn_clear, () => set(searchQuery, ""));
        append($$anchor_sc, btn_clear);
      };
      if_block(search_clear_anchor, ($$render_sc) => {
        if (get(isSearching)) $$render_sc(render_clear);
      });
    }
    var div_2 = sibling(div, 2);
    var node_3 = child(div_2);
    {
      var consequent_2 = ($$anchor2) => {
        var div_3 = root$9();
        var text_2 = child(div_3);
        var button = sibling(text_2, 3);
        template_effect(() => set_text(text_2, $$props.store.error || "Couldn't load posts."));
        delegated("click", button, () => $$props.store.retry());
        append($$anchor2, div_3);
      };
      var consequent_3 = ($$anchor2) => {
        var div_4 = root_1$7();
        append($$anchor2, div_4);
      };
      var consequent_4 = ($$anchor2) => {
        var div_5 = root_2$6();
        append($$anchor2, div_5);
      };
      var consequent_search = ($$anchor2) => {
        var res_label = document.createElement("div");
        res_label.className = "listdiv";
        user_effect(() => () => { if (res_label.parentNode) res_label.parentNode.removeChild(res_label); });
        template_effect(() => {
          const results = get(searchResults);
          const q = get(searchQuery).trim();
          res_label.textContent = results.length === 0
            ? `No results for "${q}"`
            : `${results.length} ${results.length === 1 ? "result" : "results"} for "${q}"`;
        });
        append($$anchor2, res_label);
        each($$anchor2, 17, () => get(searchResults), (p2) => p2.id, ($$anchor_r, post_r) => {
          PostRow($$anchor_r, {
            get post() { return get(post_r); },
            get categoryName() { return nameFor(get(post_r)); },
            get selected() { return $$props.selectedId === get(post_r).id; },
            get pinned() { return $$props.store.isPinned(get(post_r)); },
            get nativePinned() { return get(post_r).pinned; },
            onSelect: $$props.onSelect,
            onTogglePin: (id) => $$props.store.togglePin(id, get(post_r).pinned)
          });
        });
      };
      var alternate = ($$anchor2) => {
        var fragment_2 = root_6$1();
        var node_4 = first_child(fragment_2);
        {
          var consequent_8 = ($$anchor3) => {
            var fragment_3 = root_5$1();
            var div_6 = first_child(fragment_3);
            var button_1 = child(div_6);
            var text_3 = child(button_1);
            var span_1 = sibling(text_3);
            let classes;
            var node_5 = sibling(button_1, 2);
            {
              var consequent_5 = ($$anchor4) => {
                var select = root_3$5();
                var option = child(select);
                option.value = option.__value = "default";
                var option_1 = sibling(option);
                option_1.value = option_1.__value = "newest";
                var option_2 = sibling(option_1);
                option_2.value = option_2.__value = "oldest";
                var option_3 = sibling(option_2);
                option_3.value = option_3.__value = "alpha";
                bind_select_value(select, () => get(pinnedSort), ($$value) => set(pinnedSort, $$value));
                append($$anchor4, select);
              };
              if_block(node_5, ($$render) => {
                if (!get(pinnedCollapsed)) $$render(consequent_5);
              });
            }
            var node_6 = sibling(div_6, 2);
            {
              var consequent_6 = ($$anchor4) => {
                var fragment_4 = comment$1();
                var node_7 = first_child(fragment_4);
                each(node_7, 17, () => get(sortedPinned), (post2) => post2.id, ($$anchor5, post2) => {
                  {
                    let $0 = /* @__PURE__ */ user_derived(() => nameFor(get(post2)));
                    let $1 = /* @__PURE__ */ user_derived(() => $$props.selectedId === get(post2).id);
                    let $2 = /* @__PURE__ */ user_derived(() => $$props.store.isPinned(get(post2)));
                    PostRow($$anchor5, {
                      get post() {
                        return get(post2);
                      },
                      get categoryName() {
                        return get($0);
                      },
                      get selected() {
                        return get($1);
                      },
                      get pinned() {
                        return get($2);
                      },
                      get nativePinned() {
                        return get(post2).pinned;
                      },
                      get onSelect() {
                        return $$props.onSelect;
                      },
                      onTogglePin: (id) => $$props.store.togglePin(id, get(post2).pinned)
                    });
                  }
                });
                append($$anchor4, fragment_4);
              };
              if_block(node_6, ($$render) => {
                if (!get(pinnedCollapsed)) $$render(consequent_6);
              });
            }
            var node_8 = sibling(node_6, 2);
            {
              var consequent_7 = ($$anchor4) => {
                var div_7 = root_4$3();
                append($$anchor4, div_7);
              };
              if_block(node_8, ($$render) => {
                if (get(visibleUnpinned).length) $$render(consequent_7);
              });
            }
            template_effect(() => {
              set_attribute(button_1, "aria-expanded", !get(pinnedCollapsed));
              set_attribute(button_1, "title", get(pinnedCollapsed) ? "Pinned uitklappen" : "Pinned inklappen");
              set_text(text_3, `📌 Pinned (${get(pinned).length ?? ""}) `);
              classes = set_class(span_1, 1, "pinned-chevron", null, classes, { collapsed: get(pinnedCollapsed) });
            });
            delegated("click", button_1, () => set(pinnedCollapsed, !get(pinnedCollapsed)));
            append($$anchor3, fragment_3);
          };
          if_block(node_4, ($$render) => {
            if (get(pinned).length) $$render(consequent_8);
          });
        }
        var node_9 = sibling(node_4, 2);
        each(node_9, 17, () => get(visibleUnpinned), (post2) => post2.id, ($$anchor3, post2) => {
          {
            let $0 = /* @__PURE__ */ user_derived(() => nameFor(get(post2)));
            let $1 = /* @__PURE__ */ user_derived(() => $$props.selectedId === get(post2).id);
            let $2 = /* @__PURE__ */ user_derived(() => $$props.store.isPinned(get(post2)));
            PostRow($$anchor3, {
              get post() {
                return get(post2);
              },
              get categoryName() {
                return get($0);
              },
              get selected() {
                return get($1);
              },
              get pinned() {
                return get($2);
              },
              get nativePinned() {
                return get(post2).pinned;
              },
              get onSelect() {
                return $$props.onSelect;
              },
              onTogglePin: (id) => $$props.store.togglePin(id, get(post2).pinned)
            });
          }
        });
        append($$anchor2, fragment_2);
      };
      if_block(node_3, ($$render) => {
        if ($$props.store.status === "error" && get(total) === 0) $$render(consequent_2);
        else if ($$props.store.isInitialLoading) $$render(consequent_3, 1);
        else if (get(isSearching)) $$render(consequent_search, 2);
        else if (get(total) === 0) $$render(consequent_4, 3);
        else $$render(alternate, -1);
      });
    }
    bind_this(div_2, ($$value) => set(listEl, $$value), () => get(listEl));
    var div_8 = sibling(div_2, 2);
    let classes_1;
    var span_2 = child(div_8);
    var text_4 = child(span_2);
    bind_this(div_8, ($$value) => set(sentinelEl, $$value), () => get(sentinelEl));
    bind_this(aside, ($$value) => set(paneEl, $$value), () => get(paneEl));
    template_effect(() => {
      set_style(aside, `width: ${listWidth() ?? ""}px; min-width: ${listWidth() ?? ""}px`);
      classes_1 = set_class(div_8, 1, "sentinel", null, classes_1, {
        show: (get(hasMoreWindow) || $$props.store.isCrawling) && get(total) > 0
      });
      set_text(text_4, $$props.store.isCrawling ? "Indexing more…" : "Loading more…");
    });
    append($$anchor, aside);
    pop();
  }
  delegate(["click"]);
  enable_legacy_mode_flag();
  var root$8 = /* @__PURE__ */ from_svg(`<svg class="ic-thumb" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 21h8.04c.83 0 1.54-.5 1.84-1.22l2.74-6.4c.09-.21.13-.43.13-.66V11c0-.83-.67-1.5-1.5-1.5h-5.13l.86-4.16.03-.31c0-.39-.16-.74-.42-1L14.66 3 8.29 9.38c-.36.36-.58.86-.58 1.41V19c0 1.1.9 2 2 2zM3 9.5c-.55 0-1 .45-1 1V20c0 .55.45 1 1 1h2.5c.28 0 .5-.22.5-.5v-10c0-.28-.22-.5-.5-.5H3z"></path></svg>`);
  function Thumb($$anchor) {
    var svg = root$8();
    append($$anchor, svg);
  }
  const BASE = "https://www.skool.com";
  const API2_BASE = "https://api2.skool.com";
  function buildQuery(pairs) {
    const parts = [];
    for (const [key, value] of pairs) {
      if (value === void 0 || value === null || value === "") continue;
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
    return parts.length ? `?${parts.join("&")}` : "";
  }
  function feedUrl({ buildId, slug, page = 1, sort = "newest-cm", labelId }) {
    const query = buildQuery([
      ["group", slug],
      ["p", page],
      ["s", sort],
      ["c", labelId]
    ]);
    return `${BASE}/_next/data/${buildId}/${slug}.json${query}`;
  }
  function postUrl({ buildId, slug, postSlug }) {
    const query = buildQuery([["group", slug]]);
    return `${BASE}/_next/data/${buildId}/${slug}/${postSlug}.json${query}`;
  }
  function commentsUrl({ postId, groupId, limit = 25, pinned, tail, createdGt, last }) {
    const query = buildQuery([
      ["group-id", groupId],
      ["pinned", pinned ? "true" : void 0],
      ["tail", tail ? "true" : void 0],
      ["created-gt", createdGt],
      ["limit", limit],
      ["last", last]
    ]);
    return `${API2_BASE}/posts/${postId}/comments${query}`;
  }
  function voteUrl(postId) {
    return `${API2_BASE}/posts/${postId}/vote`;
  }
  function createPostUrl() {
    return `${API2_BASE}/posts?follow=false`;
  }
  function searchUsersUrl() {
    return `${API2_BASE}/search/users`;
  }
  function profileUrl(handle, slug) {
    const q = slug ? `?g=${encodeURIComponent(slug)}` : "";
    return `${BASE}/@${encodeURIComponent(handle)}${q}`;
  }
  function notificationsUrl({ cursor, limit = 30, type = "all" } = {}) {
    const query = buildQuery([
      ["cursor", cursor],
      ["limit", limit],
      ["type", type]
    ]);
    return `${API2_BASE}/self/notifications${query}`;
  }
  const post = {
    id: "id",
    slug: "name",
    title: "metadata.title",
    content: "metadata.content",
    upvotes: "metadata.upvotes",
    comments: "metadata.comments",
    pinned: "metadata.pinned",
    created: "createdAt",
    labelId: "labelId",
    author: {
      _root: "user",
      id: "id",
      handle: "name",
      firstName: "firstName",
      lastName: "lastName",
      avatar: "metadata.pictureBubble"
    }
  };
  const comment = {
    id: [
      "id"
    ],
    content: [
      "metadata.content",
      "content"
    ],
    upvotes: [
      "metadata.upvotes",
      "upvotes"
    ],
    ts: [
      "created_at",
      "createdAt"
    ],
    author: {
      _root: [
        "user",
        "author"
      ],
      id: [
        "id",
        "user_id"
      ],
      handle: [
        "name"
      ],
      firstName: [
        "first_name",
        "firstName",
        "name"
      ],
      lastName: [
        "last_name",
        "lastName"
      ],
      avatar: [
        "metadata.picture_bubble",
        "metadata.pictureBubble",
        "picture_bubble",
        "pictureBubble",
        "avatar"
      ]
    },
    replies: [
      "children",
      "replies",
      "comments"
    ]
  };
  const mention = {
    id: "id",
    handle: "name",
    firstName: "first_name",
    lastName: "last_name",
    avatar: "metadata.picture_bubble"
  };
  const notification = {
    id: "id",
    unread: "unread",
    ts: [
      "created_at",
      "createdAt"
    ],
    dataString: "metadata.data",
    action: "action",
    data: {
      action: "action",
      actorName: "display_name",
      actorAvatar: "image_url",
      text: "text",
      preview: "content",
      linkAs: "link_as",
      postId: "post_id",
      rootPostId: "root_post_id"
    }
  };
  const mapping = {
    post,
    comment,
    mention,
    notification
  };
  const BULLET = "•";
  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => {
      switch (char) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        default:
          return "&#39;";
      }
    });
  }
  const LINK_PATTERN = /\[([^\]]*?)\]\(([^)]+)\)/g;
  const TAG_PATTERN = /\[\/?[a-z][^\]]*\]/gi;
  const ESCAPED_PARENS = /\\([()])/g;
  const EXCESS_NEWLINES = /\n{3,}/g;
  function isObjUrl(url) {
    return /^obj:\/\//i.test(url.trim());
  }
  function objUserId(url) {
    const match = /^obj:\/\/user\/([^/?#\s]+)/i.exec(url.trim());
    return match ? match[1] : "";
  }
  function normalizeLabel(label) {
    const core = label.replace(/\s+/g, " ").trim();
    if (!core) return "";
    const lead = /^\s/.test(label) ? " " : "";
    const trail = /\s$/.test(label) ? " " : "";
    return `${lead}${core}${trail}`;
  }
  function toHtml(raw, opts = {}) {
    if (!raw) return "";
    let out = escapeHtml(String(raw));
    out = out.replace(ESCAPED_PARENS, "$1");
    out = out.replace(LINK_PATTERN, (_match, label, url) => {
      const normalized = normalizeLabel(label);
      const href = url.trim();
      if (isObjUrl(href)) {
        const id = objUserId(href);
        const label2 = normalized.trim() || href;
        const lead2 = /^\s/.test(normalized) ? " " : "";
        const trail2 = /\s$/.test(normalized) && normalized.trim() ? " " : "";
        const profile = id && typeof opts.mentionHref === "function" ? opts.mentionHref(id) : null;
        const inner = profile ? `<a class="sv-mention" href="${escapeHtml(profile)}" target="_blank" rel="noopener noreferrer">${label2}</a>` : `<span class="sv-mention">${label2}</span>`;
        return `${lead2}${inner}${trail2}`;
      }
      const text2 = normalized.trim() || href;
      const lead = /^\s/.test(normalized) ? " " : "";
      const trail = /\s$/.test(normalized) && normalized.trim() ? " " : "";
      const safeHref = /^https?:\/\//i.test(href) ? href : "#";
      return `${lead}<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${text2}</a>${trail}`;
    });
    out = out.replace(/\[li\]/gi, `
${BULLET} `).replace(TAG_PATTERN, "");
    return out.replace(EXCESS_NEWLINES, "\n\n").trim();
  }
  function toText(raw) {
    if (!raw) return "";
    let out = String(raw).replace(/\[li\]/gi, `
${BULLET} `);
    out = out.replace(LINK_PATTERN, (_match, label, url) => {
      const normalized = normalizeLabel(label);
      const text2 = normalized.trim();
      const link2 = url.trim();
      if (isObjUrl(link2)) return normalized || link2;
      if (!text2) return link2;
      const lead = /^\s/.test(normalized) ? " " : "";
      const trail = /\s$/.test(normalized) ? " " : "";
      return `${lead}${text2} (${link2})${trail}`;
    });
    out = out.replace(TAG_PATTERN, "").replace(ESCAPED_PARENS, "$1");
    return out.replace(EXCESS_NEWLINES, "\n\n").trim();
  }
  function getPath(obj, path) {
    if (obj == null || !path) return void 0;
    let current = obj;
    for (const key of path.split(".")) {
      if (current == null || typeof current !== "object") return void 0;
      current = /** @type {Record<string, unknown>} */
      current[key];
    }
    return current;
  }
  function pick(obj, paths) {
    const list = Array.isArray(paths) ? paths : [paths];
    for (const path of list) {
      const value = getPath(obj, path);
      if (value !== void 0 && value !== null && value !== "") return value;
    }
    return void 0;
  }
  function mapAuthor(spec, raw) {
    const root2 = pick(raw, spec._root) ?? raw ?? {};
    const firstName = String(pick(root2, spec.firstName) ?? "");
    const lastName = String(pick(root2, spec.lastName) ?? "");
    const composed = `${firstName} ${lastName}`.trim();
    const avatar = String(pick(root2, spec.avatar) ?? "");
    const name = composed || "Member";
    const id = String(pick(root2, spec.id) ?? "");
    const handle = String(pick(root2, spec.handle) ?? "");
    const levelCandidates = [
      "metadata.level", "metadata.currentLevel", "metadata.skoolLevel", "metadata.memberLevel",
      "metadata.communityLevel", "metadata.rank", "metadata.tier", "metadata.xp",
      "level", "currentLevel", "memberLevel", "communityLevel", "skoolLevel", "rank", "tier",
      "member.level", "member.currentLevel", "membership.level", "groupMembership.level",
      "communityMembership.level", "memberProfile.level", "profile.level"
    ];
    let levelRaw = levelCandidates.reduce((found, path) => found ?? pick(root2, path) ?? pick(raw, path), void 0);
    // Parse Skool's packed sp_data JSON (contains "lv" = level) from metadata
    if (levelRaw == null || levelRaw === "") {
      const spStr = String(
        pick(root2, "metadata.sp_data") ?? pick(root2, "metadata.spData") ??
        pick(raw, "metadata.sp_data") ?? pick(raw, "metadata.spData") ?? ""
      );
      if (spStr) {
        try { const spd = JSON.parse(spStr); if (spd?.lv > 0) levelRaw = spd.lv; } catch {}
      }
    }
    if (levelRaw == null || levelRaw === "") {
      const deepScan = (obj, depth) => {
        if (!obj || typeof obj !== "object" || depth <= 0) return;
        for (const [k, v] of Object.entries(obj)) {
          const kl = k.toLowerCase();
          // sp_data / spData JSON strings — look for "lv" field
          if ((k === "sp_data" || k === "spData") && typeof v === "string") {
            try { const spd = JSON.parse(v); if (spd?.lv > 0) { levelRaw = spd.lv; return; } } catch {}
          }
          if ((kl.includes("level") || kl === "rank" || kl === "tier") && v != null && v !== "") {
            const n = Number(v);
            if (n > 0 && n < 200) { levelRaw = v; return; }
          }
        }
        for (const [, v] of Object.entries(obj)) {
          if (v && typeof v === "object" && !Array.isArray(v)) { deepScan(v, depth - 1); if (levelRaw != null) return; }
        }
      };
      deepScan(root2, 4);
      if (levelRaw == null) deepScan(raw, 4);
    }
    const level = levelRaw != null && levelRaw !== "" ? Number(levelRaw) || 0 : 0;
    return { id, name, handle, firstName, lastName, avatar, level };
  }
  function asInt(value) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }
  function parseAttachments(dataString) {
    if (!dataString) return [];
    let arr;
    try {
      arr = JSON.parse(String(dataString));
    } catch {
      return [];
    }
    if (!Array.isArray(arr)) return [];
    return arr.map((entry) => {
      const meta = (
        /** @type {Record<string, unknown>} */
        entry && typeof entry === "object" ? entry.metadata ?? {} : {}
      );
      const type = String(meta.content_type ?? "");
      const full = String(
        meta.read_url ?? meta.image_md_url ?? meta.image_lg_url ?? meta.src_read_url ?? ""
      );
      const thumb = String(meta.image_sm_url ?? meta.image_md_url ?? full);
      return {
        id: String((entry && entry.id) ?? ""),
        type,
        name: String(meta.file_name ?? ""),
        isImage: /^image\//i.test(type),
        thumbUrl: thumb || full,
        fullUrl: full || thumb
      };
    }).filter((a) => a.fullUrl);
  }
  function mapPost(raw) {
    const spec = mapping.post;
    const content = String(getPath(raw, spec.content) ?? "");
    return {
      id: String(getPath(raw, spec.id) ?? ""),
      slug: String(getPath(raw, spec.slug) ?? ""),
      title: String(getPath(raw, spec.title) ?? ""),
      content,
      contentHtml: toHtml(content),
      contentText: toText(content),
      upvotes: asInt(getPath(raw, spec.upvotes)),
      comments: asInt(getPath(raw, spec.comments)),
      pinned: Boolean(getPath(raw, spec.pinned)),
      created: String(getPath(raw, spec.created) ?? ""),
      labelId: (
        /** @type {string | null} */
        getPath(raw, spec.labelId) ?? null
      ),
      author: mapAuthor(spec.author, raw),
      // Next.js routes camelCase the field (`attachmentsData`); api2 uses snake_case — try both.
      attachments: parseAttachments(
        getPath(raw, "metadata.attachmentsData") ?? getPath(raw, "metadata.attachments_data")
      )
    };
  }
  function mapComment(raw) {
    const spec = mapping.comment;
    const node = (
      /** @type {Record<string, unknown> | null} */
      raw && typeof raw === "object" ? raw : null
    );
    const isTreeNode = Boolean(node && "post" in node && node.post);
    const commentPost = isTreeNode ? node == null ? void 0 : node.post : raw;
    const rawReplies = isTreeNode ? pick(node, spec.replies) : pick(commentPost, spec.replies);
    const content = String(pick(commentPost, spec.content) ?? "");
    const replies = Array.isArray(rawReplies) ? rawReplies.map((child2) => mapComment(child2)) : [];
    return {
      id: String(pick(commentPost, spec.id) ?? ""),
      content,
      contentHtml: toHtml(content),
      contentText: toText(content),
      upvotes: asInt(pick(commentPost, spec.upvotes)),
      ts: String(pick(commentPost, spec.ts) ?? ""),
      author: mapAuthor(spec.author, commentPost),
      replies,
      attachments: parseAttachments(
        getPath(commentPost, "metadata.attachments_data") ?? getPath(commentPost, "metadata.attachmentsData")
      )
    };
  }
  function mapMentionUser(raw) {
    const spec = mapping.mention;
    const first = String(pick(raw, spec.firstName) ?? "");
    const last = String(pick(raw, spec.lastName) ?? "");
    const handle = String(pick(raw, spec.handle) ?? "");
    const name = `${first} ${last}`.trim() || handle || "Member";
    return {
      id: String(pick(raw, spec.id) ?? ""),
      handle,
      name,
      avatar: String(pick(raw, spec.avatar) ?? "")
    };
  }
  function mapNotification(raw) {
    const spec = mapping.notification;
    let data = {};
    try {
      const parsed = JSON.parse(String(pick(raw, spec.dataString) ?? "{}"));
      if (parsed && typeof parsed === "object") data = parsed;
    } catch {
      data = {};
    }
    const action = String(pick(data, spec.data.action) ?? pick(raw, spec.action) ?? "");
    const linkAs = String(pick(data, spec.data.linkAs) ?? "");
    const rootPostId = String(pick(data, spec.data.rootPostId) ?? "");
    const postId = String(pick(data, spec.data.postId) ?? "");
    return {
      id: String(pick(raw, spec.id) ?? ""),
      type: notificationType(action),
      actorName: String(pick(data, spec.data.actorName) ?? ""),
      actorAvatar: String(pick(data, spec.data.actorAvatar) ?? ""),
      text: String(pick(data, spec.data.text) ?? ""),
      preview: String(pick(data, spec.data.preview) ?? ""),
      href: linkAs ? `${BASE}${linkAs}` : "",
      rootPostId,
      // For a comment/reply/mention (and like-comment) post_id is the COMMENT and differs from the
      // root; for a new-post / like-post it equals the root, so there's no specific comment to jump to.
      commentId: postId && postId !== rootPostId ? postId : "",
      postSlug: slugFromLinkAs(linkAs),
      unread: Boolean(pick(raw, spec.unread)),
      ts: String(pick(raw, spec.ts) ?? "")
    };
  }
  function slugFromLinkAs(linkAs) {
    const path = String(linkAs).split("?")[0];
    const parts = path.split("/").filter(Boolean);
    return parts[1] ?? "";
  }
  function notificationType(action) {
    if (/mention/.test(action)) return "mention";
    if (/comment/.test(action)) return "comment";
    if (/upvote|like/.test(action)) return "like";
    if (/post/.test(action)) return "post";
    return "other";
  }
  class WriteError extends Error {
    /** @param {string} message @param {number} status */
    constructor(message, status) {
      super(message);
      this.name = "WriteError";
      this.status = status;
      this.isWaf = status === 403;
    }
  }
  function resolveFetch$1(fetchFn) {
    const fn = fetchFn ?? /** @type {FetchLike | undefined} */
    globalThis.fetch;
    if (typeof fn !== "function") {
      throw new Error("write: no fetch available — pass one in or run where globalThis.fetch exists");
    }
    return fn;
  }
  function asRecord$1(value) {
    return value != null && typeof value === "object" && !Array.isArray(value) ? (
      /** @type {Record<string, unknown>} */
      value
    ) : {};
  }
  let createLogged = false;
  function logCreateOnce(json) {
    if (createLogged) return;
    createLogged = true;
    try {
      console.info("[skool-view] raw create response:", json);
    } catch {
    }
  }
  async function sendJson(fetchFn, url, method, body, wafToken) {
    const res = await fetchFn(url, {
      method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "x-aws-waf-token": wafToken ?? ""
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      throw new WriteError(`write: ${res.status} ${res.statusText ?? ""} for ${url}`.trim(), res.status);
    }
    try {
      return asRecord$1(await res.json());
    } catch {
      return {};
    }
  }
  async function vote({ postId, like, wafToken, fetch: fetch2 }) {
    const fn = resolveFetch$1(fetch2);
    const body = like ? { old: "", new: "up" } : { old: "up", new: "" };
    await sendJson(fn, voteUrl(postId), "PUT", body, wafToken);
  }
  async function createComment({ groupId, rootId, parentId, content, wafToken, fetch: fetch2 }) {
    const fn = resolveFetch$1(fetch2);
    const body = {
      post_type: "comment",
      group_id: groupId,
      root_id: rootId,
      parent_id: parentId,
      metadata: {
        title: "",
        content,
        attachments: "",
        action: 0,
        video_ids: ""
      }
    };
    const json = await sendJson(fn, createPostUrl(), "POST", body, wafToken);
    logCreateOnce(json);
    const created = pickCreated(json);
    const mapped = created != null ? mapComment(created) : null;
    if (mapped && mapped.id) {
      return { ...mapped, content: mapped.content || content };
    }
    const id = String(asRecord$1(json).id ?? asRecord$1(json).post_id ?? "");
    return minimalComment(id, content);
  }
  function pickCreated(json) {
    const postTree = asRecord$1(json.post_tree);
    if (postTree.post != null) return json.post_tree;
    if (json.post != null) return json.post;
    const meta = asRecord$1(json.metadata);
    if (meta.content != null || json.post_type === "comment") return json;
    return null;
  }
  function minimalComment(id, content) {
    return {
      id,
      content,
      contentHtml: "",
      contentText: content,
      upvotes: 0,
      ts: (/* @__PURE__ */ new Date()).toISOString(),
      author: { id: "", name: "", handle: "", firstName: "", lastName: "", avatar: "" },
      replies: []
    };
  }
  const CACHE_MS = 3 * 60 * 1e3;
  let cached = null;
  async function getWafToken(now = Date.now) {
    const t = now();
    if (cached && t - cached.at < CACHE_MS && cached.token) return cached.token;
    try {
      const reply = (
        /** @type {{ token?: string }} */
        await browser.runtime.sendMessage({ type: "skool-view:get-waf-token" })
      );
      const token = (reply == null ? void 0 : reply.token) ?? "";
      cached = { token, at: t };
      return token;
    } catch {
      return "";
    }
  }
  function clearWafToken() {
    cached = null;
  }
  var root$7 = /* @__PURE__ */ from_html(`<span class="acterr" role="status">Couldn't save — try again</span>`);
  var root_1$6 = /* @__PURE__ */ from_html(`<div class="dactions"><button type="button"><!> </button> <button type="button"> </button> <!></div>`);
  function PostActions($$anchor, $$props) {
    push($$props, true);
    let nativePinned = prop($$props, "nativePinned", 3, false), voteFn = prop($$props, "voteFn", 3, vote), tokenFn = prop($$props, "tokenFn", 3, getWafToken);
    let liked = /* @__PURE__ */ state(false);
    let count = /* @__PURE__ */ state(0);
    let sending = /* @__PURE__ */ state(false);
    let errored = /* @__PURE__ */ state(false);
    user_effect(() => {
      void $$props.postId;
      set(liked, false);
      set(count, $$props.upvotes, true);
      set(errored, false);
    });
    async function toggleLike() {
      if (get(sending)) return;
      const prevLiked = get(liked);
      const prevCount = get(count);
      const next = !get(liked);
      set(liked, next);
      set(count, Math.max(0, get(count) + (next ? 1 : -1)), true);
      set(sending, true);
      set(errored, false);
      try {
        const wafToken = await tokenFn()();
        await voteFn()({ postId: $$props.postId, like: next, wafToken });
      } catch (err) {
        set(liked, prevLiked, true);
        set(count, prevCount, true);
        set(errored, true);
        if (
          /** @type {any} */
          (err == null ? void 0 : err.status) === 403
        ) clearWafToken();
      } finally {
        set(sending, false);
      }
    }
    var div = root_1$6();
    var button = child(div);
    let classes;
    var node = child(button);
    Thumb(node);
    var text2 = sibling(node);
    var button_1 = sibling(button, 2);
    let classes_1;
    var text_1 = child(button_1);
    var node_1 = sibling(button_1, 2);
    {
      var consequent = ($$anchor2) => {
        var span = root$7();
        append($$anchor2, span);
      };
      if_block(node_1, ($$render) => {
        if (get(errored)) $$render(consequent);
      });
    }
    template_effect(
      ($0) => {
        classes = set_class(button, 1, "act like", null, classes, { on: get(liked) });
        button.disabled = get(sending);
        set_attribute(button, "aria-pressed", get(liked));
        set_attribute(button, "aria-busy", get(sending));
        set_attribute(button, "aria-label", `${get(liked) ? "Unlike" : "Like"} post, ${get(count)} likes`);
        set_text(text2, ` ${$0 ?? ""}`);
        classes_1 = set_class(button_1, 1, "act pin", null, classes_1, { on: $$props.pinned });
        button_1.disabled = nativePinned();
        set_attribute(button_1, "title", nativePinned() ? "Pinned by Skool" : $$props.pinned ? "Unpin (local)" : "Pin (local)");
        set_attribute(button_1, "aria-pressed", $$props.pinned);
        set_attribute(button_1, "aria-label", nativePinned() ? "Pinned by Skool" : `${$$props.pinned ? "Unpin" : "Pin"} post (local)`);
        set_text(text_1, `📌 ${$$props.pinned ? "Pinned" : "Pin"}`);
      },
      [() => compactCount(get(count))]
    );
    delegated("click", button, toggleLike);
    delegated("click", button_1, () => {
      var _a2;
      return (_a2 = $$props.onTogglePin) == null ? void 0 : _a2.call($$props, $$props.postId);
    });
    append($$anchor, div);
    pop();
  }
  delegate(["click"]);
  const CHIP_PATTERN = /id="chip-filter-chip-([0-9a-f]{32})"[^>]*>(.*?)<\/button>/g;
  const INNER_TAG_PATTERN = /<[^>]+>/g;
  const ENTITY_MAP = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " "
  };
  function unescapeHtml(value) {
    return value.replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/&#(\d+);/g, (_m, dec) => String.fromCodePoint(parseInt(dec, 10))).replace(/&[a-z]+;/gi, (entity) => ENTITY_MAP[entity.toLowerCase()] ?? entity);
  }
  function parseCategories(html2) {
    if (!html2) return [];
    const categories = [];
    for (const match of html2.matchAll(CHIP_PATTERN)) {
      const id = match[1];
      const name = unescapeHtml(match[2].replace(INNER_TAG_PATTERN, "")).trim();
      categories.push({ id, name });
    }
    return categories;
  }
  const JSON_HEADERS = { Accept: "application/json" };
  function resolveFetch(fetchFn) {
    const fn = fetchFn ?? /** @type {FetchLike | undefined} */
    globalThis.fetch;
    if (typeof fn !== "function") {
      throw new Error("read: no fetch available — pass one in or run where globalThis.fetch exists");
    }
    return fn;
  }
  function asRecord(value) {
    return value != null && typeof value === "object" && !Array.isArray(value) ? (
      /** @type {Record<string, unknown>} */
      value
    ) : {};
  }
  async function fetchJson(fetchFn, url) {
    const res = await fetchFn(url, { headers: JSON_HEADERS });
    if (!res.ok) {
      throw new Error(`read: ${res.status} ${res.statusText ?? ""} for ${url}`.trim());
    }
    return asRecord(await res.json());
  }
  function mapPostTrees(pageProps) {
    const trees = Array.isArray(pageProps.postTrees) ? pageProps.postTrees : [];
    return trees
      .map((tree) => asRecord(tree))
      .filter((tree) => tree.post != null)
      .map((tree) => {
        const post2 = mapPost(tree.post);
        // Fallback: als metadata.comments 0 is maar de tree wél children heeft, gebruik children.length
        const childCount = Array.isArray(tree.children) ? tree.children.length : 0;
        if (childCount > post2.comments) post2.comments = childCount;
        return post2;
      });
  }
  async function getFeedPage({ buildId, slug, page = 1, sort, labelId, fetchFn }) {
    const fn = resolveFetch(fetchFn);
    const res = await fn(feedUrl({ buildId, slug, page, sort, labelId }), { headers: JSON_HEADERS });
    if (!res.ok) {
      return { ok: false, status: res.status, posts: [], total: null };
    }
    const pageProps = asRecord(asRecord(await res.json()).pageProps);
    ingestFeedLevels(pageProps);
    return {
      ok: true,
      status: res.status,
      posts: mapPostTrees(pageProps),
      total: typeof pageProps.total === "number" ? pageProps.total : null
    };
  }
  async function getPost({ buildId, slug, postSlug, fetchFn }) {
    const fn = resolveFetch(fetchFn);
    const data = await fetchJson(fn, postUrl({ buildId, slug, postSlug }));
    const pageProps = asRecord(data.pageProps);
    ingestFeedLevels(pageProps);
    const tree = asRecord(pageProps.postTree);
    const rawPost = tree.post ?? pageProps.post ?? null;
    const children = Array.isArray(tree.children) ? tree.children : [];
    return {
      post: rawPost != null ? mapPost(rawPost) : null,
      // Pass each tree node straight to mapComment — it normalizes `{ post, children }` nodes,
      // reading the comment from `.post` and nested replies from the node's `children`.
      comments: children.filter((child2) => asRecord(child2).post != null).map((child2) => mapComment(child2))
    };
  }
  let loggedCommentsShape = false;
  function commentsFromResponse(json) {
    if (Array.isArray(json)) return json;
    const record = asRecord(json);
    const treeChildren = getPath(record, "post_tree.children");
    if (Array.isArray(treeChildren)) return (
      /** @type {unknown[]} */
      treeChildren
    );
    for (const key of ["comments", "posts", "data", "children", "items"]) {
      if (Array.isArray(record[key])) return (
        /** @type {unknown[]} */
        record[key]
      );
    }
    return [];
  }
  async function getComments({ postId, groupId, wafToken, createdGt, limit = 25, fetchFn }) {
    const fn = resolveFetch(fetchFn);
    const url = commentsUrl({
      postId,
      groupId,
      limit,
      ...createdGt != null ? { createdGt } : { pinned: true }
    });
    const res = await fn(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "x-aws-waf-token": wafToken ?? ""
      }
    });
    if (!res.ok) {
      throw new Error(`read: ${res.status} ${res.statusText ?? ""} for ${url}`.trim());
    }
    const json = await res.json();
    if (!loggedCommentsShape) {
      loggedCommentsShape = true;
      try {
        console.info("[skool-view] raw comments response:", json);
        const first = commentsFromResponse(json)[0];
        if (first !== void 0) {
          console.info("[skool-view] raw comments[0]:", JSON.stringify(first, null, 2));
        }
      } catch {
      }
    }
    const nodes = commentsFromResponse(json);
    const cursor = (
      /** @type {number | string | null} */
      asRecord(json).last ?? null
    );
    // Haal actuele likes/comments op uit de parent-post in de response
    const _pt = asRecord(asRecord(json).post_tree);
    const _ptMeta = asRecord(asRecord(_pt.post ?? {}).metadata ?? {});
    const parentUpvotes = typeof _ptMeta.upvotes === "number" ? _ptMeta.upvotes : null;
    const parentComments = typeof _ptMeta.comments === "number" ? _ptMeta.comments : null;
    return {
      items: nodes.map((node) => mapComment(node)),
      cursor,
      // A full page suggests more remain; an advancing cursor is required to fetch them.
      hasMore: nodes.length >= limit && cursor != null && cursor !== createdGt,
      parentUpvotes,
      parentComments
    };
  }
  async function searchUsers({ query, groupId, wafToken, limit = 7, fetchFn }) {
    const fn = resolveFetch(fetchFn);
    const url = searchUsersUrl();
    const res = await fn(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "x-aws-waf-token": wafToken ?? ""
      },
      body: JSON.stringify({ query, group_id: groupId, limit })
    });
    if (!res.ok) {
      throw new Error(`read: ${res.status} ${res.statusText ?? ""} for ${url}`.trim());
    }
    const json = asRecord(await res.json());
    const users = Array.isArray(json.users) ? json.users : [];
    return users.map((user) => mapMentionUser(user));
  }
  async function getNotifications({ wafToken, cursor, limit = 30, type = "all", fetchFn }) {
    const fn = resolveFetch(fetchFn);
    const url = notificationsUrl({ cursor, limit, type });
    const res = await fn(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "x-aws-waf-token": wafToken ?? ""
      }
    });
    if (!res.ok) {
      throw new Error(`read: ${res.status} ${res.statusText ?? ""} for ${url}`.trim());
    }
    const json = asRecord(await res.json());
    const messages = Array.isArray(json.messages) ? json.messages : [];
    return {
      items: messages.map((message) => mapNotification(message)),
      hasMore: Boolean(json.has_more),
      cursor: typeof json.cursor === "string" ? json.cursor : ""
    };
  }
  function serializeMentions(text2, mentions) {
    if (!text2 || !mentions || mentions.length === 0) return text2 ?? "";
    let out = text2;
    let from = 0;
    for (const m of mentions) {
      if (!m || !m.id || !m.display) continue;
      const token = `@${m.display}`;
      const idx = out.indexOf(token, from);
      if (idx === -1) continue;
      const markup = `[@${m.display}](obj://user/${m.id})`;
      out = out.slice(0, idx) + markup + out.slice(idx + token.length);
      from = idx + markup.length;
    }
    return out;
  }
  var root$6 = /* @__PURE__ */ from_html(`<div class="mb-empty">Searching…</div>`);
  var root_1$5 = /* @__PURE__ */ from_html(`<button type="button"><!> <span class="mb-name"> </span> <span class="mb-handle"> </span></button>`);
  var root_2$5 = /* @__PURE__ */ from_html(`<div class="mb-list"><!> <!></div>`);
  var root_3$4 = /* @__PURE__ */ from_html(`<div class="mb"><textarea></textarea> <!></div>`);
  function MentionBox($$anchor, $$props) {
    push($$props, true);
    let value = prop($$props, "value", 15, ""), placeholder = prop($$props, "placeholder", 3, ""), ariaLabel = prop($$props, "ariaLabel", 3, ""), disabled = prop($$props, "disabled", 3, false), rows = prop($$props, "rows", 3, 3), groupId = prop($$props, "groupId", 3, ""), searchFn = prop($$props, "searchFn", 3, searchUsers), seed = prop($$props, "seed", 3, null);
    let mentions = /* @__PURE__ */ state(proxy([]));
    let textarea = /* @__PURE__ */ state(void 0);
    let open = /* @__PURE__ */ state(false);
    let items = /* @__PURE__ */ state(proxy([]));
    let active = /* @__PURE__ */ state(0);
    let searching = /* @__PURE__ */ state(false);
    let tokenStart = -1;
    let seq = 0;
    let timer;
    let seeded = /* @__PURE__ */ state(false);
    user_effect(() => {
      var _a2;
      if (get(seeded) || !seed()) return;
      set(seeded, true);
      if (value()) return;
      const display = seed().display ?? "";
      if (!display) return;
      value(`@${display} `);
      if (seed().id) {
        set(mentions, [{ display, id: seed().id, handle: seed().handle ?? "" }], true);
        if (seed().handle) (_a2 = $$props.onRegister) == null ? void 0 : _a2.call($$props, seed().id, seed().handle);
      }
    });
    function serialize() {
      return serializeMentions(value(), get(mentions));
    }
    function reset() {
      value("");
      set(mentions, [], true);
      close();
    }
    function close() {
      set(open, false);
      set(items, [], true);
      set(active, 0);
      tokenStart = -1;
      seq++;
      clearTimeout(timer);
    }
    function detect() {
      if (!get(textarea)) return;
      const pos = get(textarea).selectionStart ?? value().length;
      const match = /(^|\s)@([^\s@]{0,30})$/.exec(value().slice(0, pos));
      if (!match) {
        close();
        return;
      }
      const query = match[2];
      tokenStart = pos - query.length - 1;
      if (query.length < 1) {
        close();
        return;
      }
      set(open, true);
      set(searching, true);
      clearTimeout(timer);
      timer = setTimeout(() => run2(query), 180);
    }
    async function run2(query) {
      const my = ++seq;
      try {
        const wafToken = $$props.tokenFn ? await $$props.tokenFn() : "";
        const users = await searchFn()({ query, groupId: groupId(), wafToken, limit: 7 });
        if (my !== seq) return;
        set(items, users, true);
        set(active, 0);
        set(open, users.length > 0);
      } catch {
        if (my !== seq) return;
        set(items, [], true);
        set(open, false);
      } finally {
        if (my === seq) set(searching, false);
      }
    }
    async function pick2(user) {
      var _a2;
      if (tokenStart < 0 || !get(textarea)) {
        close();
        return;
      }
      const pos = get(textarea).selectionStart ?? value().length;
      const before = value().slice(0, tokenStart);
      const after = value().slice(pos);
      const insert = `@${user.name} `;
      value(`${before}${insert}${after}`);
      set(
        mentions,
        [
          ...get(mentions),
          { display: user.name, id: user.id, handle: user.handle }
        ],
        true
      );
      if (user.id && user.handle) (_a2 = $$props.onRegister) == null ? void 0 : _a2.call($$props, user.id, user.handle);
      const caret = before.length + insert.length;
      close();
      await tick();
      if (get(textarea)) {
        get(textarea).focus();
        get(textarea).selectionStart = get(textarea).selectionEnd = caret;
      }
    }
    function onkeydown(e) {
      if (!get(open) || get(items).length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        set(active, (get(active) + 1) % get(items).length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        set(active, (get(active) - 1 + get(items).length) % get(items).length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        pick2(get(items)[get(active)]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    }
    function onkeyup(e) {
      if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) detect();
    }
    var $$exports = { serialize, reset };
    var div = root_3$4();
    var textarea_1 = child(div);
    bind_this(textarea_1, ($$value) => set(textarea, $$value), () => get(textarea));
    var node = sibling(textarea_1, 2);
    {
      var consequent_1 = ($$anchor2) => {
        var div_1 = root_2$5();
        var node_1 = child(div_1);
        {
          var consequent = ($$anchor3) => {
            var div_2 = root$6();
            append($$anchor3, div_2);
          };
          if_block(node_1, ($$render) => {
            if (get(searching) && get(items).length === 0) $$render(consequent);
          });
        }
        var node_2 = sibling(node_1, 2);
        each(node_2, 19, () => get(items), (user) => user.id, ($$anchor3, user, i) => {
          var button = root_1$5();
          let classes;
          var node_3 = child(button);
          Avatar(node_3, {
            get src() {
              return get(user).avatar;
            },
            size: "sm"
          });
          var span = sibling(node_3, 2);
          var text2 = child(span);
          var span_1 = sibling(span, 2);
          var text_1 = child(span_1);
          template_effect(() => {
            classes = set_class(button, 1, "mb-item", null, classes, { active: get(i) === get(active) });
            set_text(text2, get(user).name);
            set_text(text_1, `@${get(user).handle ?? ""}`);
          });
          delegated("mousedown", button, (e) => {
            e.preventDefault();
            pick2(get(user));
          });
          append($$anchor3, button);
        });
        append($$anchor2, div_1);
      };
      if_block(node, ($$render) => {
        if (get(open)) $$render(consequent_1);
      });
    }
    template_effect(() => {
      set_attribute(textarea_1, "placeholder", placeholder());
      textarea_1.disabled = disabled();
      set_attribute(textarea_1, "rows", rows());
      set_attribute(textarea_1, "aria-label", ariaLabel() || void 0);
    });
    delegated("input", textarea_1, detect);
    delegated("keyup", textarea_1, onkeyup);
    delegated("keydown", textarea_1, onkeydown);
    event("blur", textarea_1, () => setTimeout(close, 120));
    bind_value(textarea_1, value);
    append($$anchor, div);
    return pop($$exports);
  }
  delegate(["input", "keyup", "keydown", "mousedown"]);
  const lightbox = proxy({ url: "", name: "" });
  function openLightbox(url, name = "") {
    if (!url) return;
    lightbox.url = url;
    lightbox.name = name;
  }
  function closeLightbox() {
    lightbox.url = "";
    lightbox.name = "";
  }
  var root$5 = /* @__PURE__ */ from_html(`<button type="button" class="attach-thumb"><img loading="lazy"/></button>`);
  var root_1$4 = /* @__PURE__ */ from_html(`<a class="dfile" target="_blank" rel="noopener noreferrer"> </a>`);
  var root_2$4 = /* @__PURE__ */ from_html(`<div></div>`);
  function AttachmentList($$anchor, $$props) {
    push($$props, true);
    let items = prop($$props, "items", 19, () => []), compact = prop($$props, "compact", 3, false);
    var fragment = comment$1();
    var node = first_child(fragment);
    {
      var consequent_1 = ($$anchor2) => {
        var div = root_2$4();
        let classes;
        each(div, 21, items, (att) => att.id, ($$anchor3, att) => {
          var fragment_1 = comment$1();
          var node_1 = first_child(fragment_1);
          {
            var consequent = ($$anchor4) => {
              var button = root$5();
              var img = child(button);
              template_effect(() => {
                set_attribute(button, "aria-label", `Open ${get(att).name || "image"}`);
                set_attribute(img, "src", get(att).thumbUrl);
                set_attribute(img, "alt", get(att).name || "attachment");
              });
              delegated("click", button, () => openLightbox(get(att).fullUrl, get(att).name));
              append($$anchor4, button);
            };
            var alternate = ($$anchor4) => {
              var a = root_1$4();
              var text2 = child(a);
              template_effect(() => {
                set_attribute(a, "href", get(att).fullUrl);
                set_text(text2, get(att).name || "Attachment");
              });
              append($$anchor4, a);
            };
            if_block(node_1, ($$render) => {
              if (get(att).isImage) $$render(consequent);
              else $$render(alternate, -1);
            });
          }
          append($$anchor3, fragment_1);
        });
        template_effect(() => classes = set_class(div, 1, "attach", null, classes, { compact: compact() }));
        append($$anchor2, div);
      };
      if_block(node, ($$render) => {
        if (items().length) $$render(consequent_1);
      });
    }
    append($$anchor, fragment);
    pop();
  }
  delegate(["click"]);
  var root$4 = /* @__PURE__ */ from_html(`<span class="acterr" role="status">Couldn't save</span>`);
  var root_1$3 = /* @__PURE__ */ from_html(`<button class="replybtn" type="button">Reply</button>`);
  var root_2$3 = /* @__PURE__ */ from_html(`<div class="acterr" role="status"> </div>`);
  var root_3$3 = /* @__PURE__ */ from_html(`<div class="replybox"><!> <button class="btn sm" type="button"> </button></div> <!>`, 1);
  var root_4$2 = /* @__PURE__ */ from_html(`<div><!> <div class="cbody"><div class="crow"><span class="who"> </span> <span class="ctime"> </span></div> <p class="ctext"></p> <!> <div class="cactions"><button type="button"><!> </button> <!> <!></div> <!></div></div>`);
  function Comment$1($$anchor, $$props) {
    push($$props, true);
    let isReply = prop($$props, "isReply", 3, false), canReply = prop($$props, "canReply", 3, false), postId = prop($$props, "postId", 3, ""), groupId = prop($$props, "groupId", 3, ""), threadId = prop($$props, "threadId", 3, ""), voteFn = prop($$props, "voteFn", 3, vote), createCommentFn = prop($$props, "createCommentFn", 3, createComment), tokenFn = prop($$props, "tokenFn", 3, getWafToken);
    let replyBox = /* @__PURE__ */ state(void 0);
    const seed = /* @__PURE__ */ user_derived(() => ({
      display: $$props.comment.author.name,
      id: $$props.comment.author.id,
      handle: $$props.comment.author.handle
    }));
    const bodyHtml = /* @__PURE__ */ user_derived(() => toHtml($$props.comment.content, { mentionHref: $$props.mentionHref }));
    let liked = /* @__PURE__ */ state(false);
    let count = /* @__PURE__ */ state(0);
    let liking = /* @__PURE__ */ state(false);
    let likeErr = /* @__PURE__ */ state(false);
    user_effect(() => {
      void $$props.comment.id;
      set(liked, false);
      set(count, $$props.comment.upvotes, true);
      set(likeErr, false);
    });
    async function toggleLike() {
      if (get(liking)) return;
      const prevLiked = get(liked);
      const prevCount = get(count);
      const next = !get(liked);
      set(liked, next);
      set(count, Math.max(0, get(count) + (next ? 1 : -1)), true);
      set(liking, true);
      set(likeErr, false);
      try {
        const wafToken = await tokenFn()();
        await voteFn()({ postId: $$props.comment.id, like: next, wafToken });
      } catch (err) {
        set(liked, prevLiked, true);
        set(count, prevCount, true);
        set(likeErr, true);
        if (
          /** @type {any} */
          (err == null ? void 0 : err.status) === 403
        ) clearWafToken();
      } finally {
        set(liking, false);
      }
    }
    let replying = /* @__PURE__ */ state(false);
    let draft = /* @__PURE__ */ state("");
    let sending = /* @__PURE__ */ state(false);
    let replyErr = /* @__PURE__ */ state("");
    function toggleReply() {
      set(replying, !get(replying));
    }
    async function sendReply() {
      var _a2, _b2, _c, _d, _e;
      const visible = get(draft).trim();
      if (!visible || get(sending)) return;
      set(sending, true);
      set(replyErr, "");
      try {
        const wafToken = await tokenFn()();
        const content = ((_a2 = get(replyBox)) == null ? void 0 : _a2.serialize()) ?? get(draft);
        const created = await createCommentFn()({
          groupId: groupId(),
          rootId: postId(),
          // Flat 2-level: a reply always attaches to the thread's top-level comment. threadId is set
          // for replies; for a top-level comment it's empty, so it replies to itself.
          parentId: threadId() || $$props.comment.id,
          content,
          wafToken
        });
        const reply = {
          ...created,
          // This is OUR write — author is the signed-in user (scraped at boot), not the blank/'Member'
          // author from the minimal POST response.
          author: {
            id: "",
            name: ((_b2 = $$props.currentUser) == null ? void 0 : _b2.name) || "You",
            handle: "",
            firstName: "",
            lastName: "",
            avatar: ((_c = $$props.currentUser) == null ? void 0 : _c.avatar) || ""
          },
          // The minimal/echoed reply may lack rendered HTML — show the raw text as a fallback.
          contentHtml: created.contentHtml || escapeHtml2(content)
        };
        (_d = $$props.onReply) == null ? void 0 : _d.call($$props, reply);
        (_e = get(replyBox)) == null ? void 0 : _e.reset();
        set(draft, "");
        set(replying, false);
      } catch (err) {
        set(
          replyErr,
          /** @type {any} */
          (err == null ? void 0 : err.status) === 403 ? "Reload Skool and try again." : "Couldn't post your reply.",
          true
        );
        if (
          /** @type {any} */
          (err == null ? void 0 : err.status) === 403
        ) clearWafToken();
      } finally {
        set(sending, false);
      }
    }
    function escapeHtml2(value) {
      return value.replace(/[&<>"']/g, (c) => c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;");
    }
    var div = root_4$2();
    let classes;
    var node = child(div);
    Avatar(node, {
      get src() {
        return $$props.comment.author.avatar;
      },
      get level() {
        return $$props.comment.author.level;
      },
      get authorName() {
        return $$props.comment.author.name;
      },
      size: "sm"
    });
    var div_1 = sibling(node, 2);
    var div_2 = child(div_1);
    var span = child(div_2);
    var text2 = child(span);
    var span_1 = sibling(span, 2);
    var text_1 = child(span_1);
    var p = sibling(div_2, 2);
    html(p, () => get(bodyHtml), true);
    var node_1 = sibling(p, 2);
    {
      let $0 = /* @__PURE__ */ user_derived(() => $$props.comment.attachments ?? []);
      AttachmentList(node_1, {
        get items() {
          return get($0);
        },
        compact: true
      });
    }
    var div_3 = sibling(node_1, 2);
    var button = child(div_3);
    let classes_1;
    var node_2 = child(button);
    Thumb(node_2);
    var text_2 = sibling(node_2);
    var node_3 = sibling(button, 2);
    {
      var consequent = ($$anchor2) => {
        var span_2 = root$4();
        append($$anchor2, span_2);
      };
      if_block(node_3, ($$render) => {
        if (get(likeErr)) $$render(consequent);
      });
    }
    var node_4 = sibling(node_3, 2);
    {
      var consequent_1 = ($$anchor2) => {
        var button_1 = root_1$3();
        template_effect(() => set_attribute(button_1, "aria-expanded", get(replying)));
        delegated("click", button_1, toggleReply);
        append($$anchor2, button_1);
      };
      if_block(node_4, ($$render) => {
        if (canReply()) $$render(consequent_1);
      });
    }
    var node_5 = sibling(div_3, 2);
    {
      var consequent_3 = ($$anchor2) => {
        var fragment = root_3$3();
        var div_4 = first_child(fragment);
        var node_6 = child(div_4);
        bind_this(
          MentionBox(node_6, {
            ariaLabel: "Write a reply",
            placeholder: "Reply…",
            rows: 2,
            get disabled() {
              return get(sending);
            },
            get groupId() {
              return groupId();
            },
            get tokenFn() {
              return tokenFn();
            },
            get seed() {
              return get(seed);
            },
            get onRegister() {
              return $$props.registerMention;
            },
            get value() {
              return get(draft);
            },
            set value($$value) {
              set(draft, $$value, true);
            }
          }),
          ($$value) => set(replyBox, $$value, true),
          () => get(replyBox)
        );
        var button_2 = sibling(node_6, 2);
        var text_3 = child(button_2);
        var node_7 = sibling(div_4, 2);
        {
          var consequent_2 = ($$anchor3) => {
            var div_5 = root_2$3();
            var text_4 = child(div_5);
            template_effect(() => set_text(text_4, get(replyErr)));
            append($$anchor3, div_5);
          };
          if_block(node_7, ($$render) => {
            if (get(replyErr)) $$render(consequent_2);
          });
        }
        template_effect(
          ($0) => {
            button_2.disabled = $0;
            set_attribute(button_2, "aria-busy", get(sending));
            set_text(text_3, get(sending) ? "Posting…" : "Reply");
          },
          [() => get(sending) || !get(draft).trim()]
        );
        delegated("click", button_2, sendReply);
        append($$anchor2, fragment);
      };
      if_block(node_5, ($$render) => {
        if (get(replying)) $$render(consequent_3);
      });
    }
    template_effect(
      ($0, $1) => {
        classes = set_class(div, 1, "comment", null, classes, { reply: isReply() });
        set_attribute(div, "data-cid", $$props.comment.id);
        set_text(text2, $$props.comment.author.name);
        set_text(text_1, $0);
        classes_1 = set_class(button, 1, "clike", null, classes_1, { on: get(liked) });
        button.disabled = get(liking);
        set_attribute(button, "aria-pressed", get(liked));
        set_attribute(button, "aria-busy", get(liking));
        set_attribute(button, "aria-label", `${get(liked) ? "Unlike" : "Like"} comment, ${get(count)} likes`);
        set_text(text_2, ` ${$1 ?? ""}`);
      },
      [
        () => commentTime($$props.comment.ts),
        () => compactCount(get(count))
      ]
    );
    delegated("click", button, toggleLike);
    append($$anchor, div);
    pop();
  }
  delegate(["click"]);
  var root$3 = /* @__PURE__ */ from_html(`<div class="acterr" role="status"> </div>`);
  var root_1$2 = /* @__PURE__ */ from_html(`<div class="cempty">Loading comments…</div>`);
  var root_2$2 = /* @__PURE__ */ from_html(`<div class="cempty"> <br/> <button class="btn sm" type="button">Retry</button></div>`);
  var root_3$2 = /* @__PURE__ */ from_html(`<div class="cempty">No comments yet — be the first to comment.</div>`);
  var root_4$1 = /* @__PURE__ */ from_html(`<div class="replies"></div>`);
  var root_5 = /* @__PURE__ */ from_html(`<!> <!>`, 1);
  var root_6 = /* @__PURE__ */ from_html(`<button class="btn sm cmore" type="button"> </button>`);
  var root_7 = /* @__PURE__ */ from_html(`<section class="comments"><div class="chead-row"><h3> </h3> <div class="seg" role="group" aria-label="Sort comments"><button type="button">Threaded</button> <button type="button">Time</button></div></div> <div class="composer"><!> <button class="btn" type="button"> </button></div> <!> <div class="clist"><!> <!></div></section>`);
  function CommentsSection($$anchor, $$props) {
    push($$props, true);
    let groupId = prop($$props, "groupId", 3, ""), fetchComments = prop($$props, "fetchComments", 3, getComments), createCommentFn = prop($$props, "createCommentFn", 3, createComment), tokenFn = prop($$props, "tokenFn", 3, getWafToken), refreshNonce = prop($$props, "refreshNonce", 3, 0), highlightCommentId = prop($$props, "highlightCommentId", 3, ""), onCommentsChange = prop($$props, "onCommentsChange", 3, void 0);
    let listEl = /* @__PURE__ */ state(void 0);
    let composer = /* @__PURE__ */ state(void 0);
    let loadState = /* @__PURE__ */ state(
      /** @type {LoadState} */
      "idle"
    );
    let errorMessage = /* @__PURE__ */ state("");
    let comments = /* @__PURE__ */ state(proxy([]));
    let commentsCursor = /* @__PURE__ */ state(null);
    let commentsHasMore = /* @__PURE__ */ state(false);
    let loadingMore = /* @__PURE__ */ state(false);
    let sort = /* @__PURE__ */ state("thread");
    let draft = /* @__PURE__ */ state("");
    let sending = /* @__PURE__ */ state(false);
    let composeErr = /* @__PURE__ */ state("");
    let requestToken = 0;
    async function load(id, gid) {
      var _a2;
      const token = ++requestToken;
      set(comments, [], true);
      set(commentsCursor, null);
      set(commentsHasMore, false);
      if (!id || !gid) {
        set(loadState, "ready");
        return;
      }
      set(loadState, "loading");
      set(errorMessage, "");
      try {
        const wafToken = await tokenFn()();
        const result = await fetchComments()({ postId: id, groupId: gid, wafToken });
        if (token !== requestToken) return;
        set(comments, result.items, true);
        set(commentsCursor, result.cursor, true);
        set(commentsHasMore, result.hasMore, true);
        registerAuthors(result.items);
        set(loadState, "ready");
        // Actuele likes/comments uit de API-response direct in de override-map zetten
        if (result.parentUpvotes != null || result.parentComments != null) {
          setPostStatOverride(id, result.parentUpvotes, result.parentComments);
        } else {
          console.warn("[sv-stat] WAARSCHUWING: parentUpvotes en parentComments zijn allebei null — geen override gezet");
        }
        (_a2 = onCommentsChange()) == null ? void 0 : _a2(get(comments));
      } catch (err) {
        console.error("[sv-stat] load FOUT:", err?.message ?? err);
        if (token !== requestToken) return;
        const is403 = err instanceof Error && /\b403\b/.test(err.message);
        if (is403) clearWafToken();
        set(
          errorMessage,
          is403 ? "Couldn't load comments — reload Skool and try again." : "Couldn't load comments. Try again.",
          true
        );
        set(loadState, "error");
      }
    }
    function retry() {
      void load($$props.postId, groupId());
    }
    async function loadMoreComments() {
      var _a2;
      if (get(loadingMore) || !get(commentsHasMore) || get(commentsCursor) == null) return;
      set(loadingMore, true);
      try {
        const wafToken = await tokenFn()();
        const result = await fetchComments()({
          postId: $$props.postId,
          groupId: groupId(),
          wafToken,
          createdGt: get(commentsCursor)
        });
        const have = new Set(get(comments).map((c) => c.id));
        const fresh = result.items.filter((c) => !have.has(c.id));
        set(comments, [...get(comments), ...fresh], true);
        registerAuthors(fresh);
        set(commentsCursor, result.cursor, true);
        set(commentsHasMore, result.hasMore && fresh.length > 0, true);
        (_a2 = onCommentsChange()) == null ? void 0 : _a2(get(comments));
      } catch (err) {
        if (err instanceof Error && /\b403\b/.test(err.message)) clearWafToken();
      } finally {
        set(loadingMore, false);
      }
    }
    user_effect(() => {
      void refreshNonce();
      void load($$props.postId, groupId());
    });
    let lastFlashed = "";
    user_effect(() => {
      void get(
        comments
        // re-run when the list (re)loads
      );
      const id = highlightCommentId();
      if (!id || id === lastFlashed || get(loadState) !== "ready" || !get(listEl)) return;
      const container = get(listEl);
      tick().then(() => {
        const node = container.querySelector(`[data-cid="${id}"]`);
        if (!node) return;
        lastFlashed = id;
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        node.classList.add("cflash");
        setTimeout(() => node.classList.remove("cflash"), 2e3);
      });
    });
    async function sendComment() {
      var _a2, _b2, _c, _d;
      const visible = get(draft).trim();
      if (!visible || get(sending)) return;
      set(sending, true);
      set(composeErr, "");
      try {
        const wafToken = await tokenFn()();
        const content = ((_a2 = get(composer)) == null ? void 0 : _a2.serialize()) ?? get(draft);
        const created = await createCommentFn()({
          groupId: groupId(),
          rootId: $$props.postId,
          parentId: $$props.postId,
          content,
          wafToken
        });
        const newComment = {
          ...created,
          // This is OUR write — the author is the signed-in user (scraped at boot). The minimal POST
          // response carries no real author (mapAuthor would default to 'Member'), so don't use it.
          author: {
            id: "",
            name: ((_b2 = $$props.currentUser) == null ? void 0 : _b2.name) || "You",
            handle: "",
            firstName: "",
            lastName: "",
            avatar: ((_c = $$props.currentUser) == null ? void 0 : _c.avatar) || ""
          },
          contentHtml: created.contentHtml || escapeHtml2(content),
          replies: created.replies ?? []
        };
        set(comments, [newComment, ...get(comments)], true);
        (_d = get(composer)) == null ? void 0 : _d.reset();
        set(draft, "");
      } catch (err) {
        set(
          composeErr,
          /** @type {any} */
          (err == null ? void 0 : err.status) === 403 ? "Reload Skool and try again." : "Couldn't post your comment.",
          true
        );
        if (
          /** @type {any} */
          (err == null ? void 0 : err.status) === 403
        ) clearWafToken();
      } finally {
        set(sending, false);
      }
    }
    function appendReply(parentId, reply) {
      set(comments, get(comments).map((c) => c.id === parentId ? { ...c, replies: [...c.replies ?? [], reply] } : c), true);
    }
    function registerAuthors(list) {
      var _a2, _b2, _c, _d;
      for (const c of list) {
        if (((_a2 = c.author) == null ? void 0 : _a2.id) && ((_b2 = c.author) == null ? void 0 : _b2.handle)) (_c = $$props.registerMention) == null ? void 0 : _c.call($$props, c.author.id, c.author.handle);
        if ((_d = c.replies) == null ? void 0 : _d.length) registerAuthors(c.replies);
      }
    }
    function escapeHtml2(value) {
      return value.replace(/[&<>"']/g, (c) => c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;");
    }
    const flatByTime = /* @__PURE__ */ user_derived(() => {
      const flat = [];
      for (const c of get(comments)) {
        flat.push(c);
        for (const r2 of c.replies ?? []) flat.push(r2);
      }
      return flat.slice().sort((a, b) => String(b.ts).localeCompare(String(a.ts)));
    });
    function countTree(nodes) {
      let total = 0;
      for (const c of nodes) total += 1 + countTree(c.replies ?? []);
      return total;
    }
    const loadedCount = /* @__PURE__ */ user_derived(() => countTree(get(comments)));
    const headerLabel = /* @__PURE__ */ user_derived(() => {
      if (get(loadState) !== "ready") return `${$$props.count} ${$$props.count === 1 ? "comment" : "comments"}`;
      if (get(commentsHasMore) && get(loadedCount) < $$props.count) return `${get(loadedCount)} of ${$$props.count} comments`;
      return `${get(loadedCount)} ${get(loadedCount) === 1 ? "comment" : "comments"}`;
    });
    var section = root_7();
    var div = child(section);
    var h3 = child(div);
    var text2 = child(h3);
    var div_1 = sibling(h3, 2);
    var button = child(div_1);
    let classes;
    var button_1 = sibling(button, 2);
    let classes_1;
    var div_2 = sibling(div, 2);
    var node_1 = child(div_2);
    bind_this(
      MentionBox(node_1, {
        ariaLabel: "Write a comment",
        placeholder: "Write a comment…",
        get disabled() {
          return get(sending);
        },
        get groupId() {
          return groupId();
        },
        get tokenFn() {
          return tokenFn();
        },
        get onRegister() {
          return $$props.registerMention;
        },
        get value() {
          return get(draft);
        },
        set value($$value) {
          set(draft, $$value, true);
        }
      }),
      ($$value) => set(composer, $$value, true),
      () => get(composer)
    );
    var button_2 = sibling(node_1, 2);
    var text_1 = child(button_2);
    var node_2 = sibling(div_2, 2);
    {
      var consequent = ($$anchor2) => {
        var div_3 = root$3();
        var text_2 = child(div_3);
        template_effect(() => set_text(text_2, get(composeErr)));
        append($$anchor2, div_3);
      };
      if_block(node_2, ($$render) => {
        if (get(composeErr)) $$render(consequent);
      });
    }
    var div_4 = sibling(node_2, 2);
    var node_3 = child(div_4);
    {
      var consequent_1 = ($$anchor2) => {
        var div_5 = root_1$2();
        append($$anchor2, div_5);
      };
      var consequent_2 = ($$anchor2) => {
        var div_6 = root_2$2();
        var text_3 = child(div_6);
        var button_3 = sibling(text_3, 3);
        template_effect(() => set_text(text_3, get(errorMessage)));
        delegated("click", button_3, retry);
        append($$anchor2, div_6);
      };
      var consequent_3 = ($$anchor2) => {
        var div_7 = root_3$2();
        append($$anchor2, div_7);
      };
      var consequent_4 = ($$anchor2) => {
        var fragment = comment$1();
        var node_4 = first_child(fragment);
        each(node_4, 17, () => get(flatByTime), (comment2) => comment2.id, ($$anchor3, comment2) => {
          Comment$1($$anchor3, {
            get comment() {
              return get(comment2);
            },
            get postId() {
              return $$props.postId;
            },
            get groupId() {
              return groupId();
            },
            get currentUser() {
              return $$props.currentUser;
            },
            get tokenFn() {
              return tokenFn();
            },
            get mentionHref() {
              return $$props.mentionHref;
            },
            get registerMention() {
              return $$props.registerMention;
            },
            get createCommentFn() {
              return createCommentFn();
            }
          });
        });
        append($$anchor2, fragment);
      };
      var alternate = ($$anchor2) => {
        var fragment_2 = comment$1();
        var node_5 = first_child(fragment_2);
        each(node_5, 17, () => get(comments), (comment2) => comment2.id, ($$anchor3, comment2) => {
          var fragment_3 = root_5();
          var node_6 = first_child(fragment_3);
          Comment$1(node_6, {
            get comment() {
              return get(comment2);
            },
            canReply: true,
            get postId() {
              return $$props.postId;
            },
            get groupId() {
              return groupId();
            },
            get currentUser() {
              return $$props.currentUser;
            },
            get tokenFn() {
              return tokenFn();
            },
            get mentionHref() {
              return $$props.mentionHref;
            },
            get registerMention() {
              return $$props.registerMention;
            },
            get createCommentFn() {
              return createCommentFn();
            },
            onReply: (reply) => appendReply(get(comment2).id, reply)
          });
          var node_7 = sibling(node_6, 2);
          {
            var consequent_5 = ($$anchor4) => {
              var div_8 = root_4$1();
              each(div_8, 21, () => get(comment2).replies, (reply) => reply.id, ($$anchor5, reply) => {
                Comment$1($$anchor5, {
                  get comment() {
                    return get(reply);
                  },
                  isReply: true,
                  canReply: true,
                  get postId() {
                    return $$props.postId;
                  },
                  get groupId() {
                    return groupId();
                  },
                  get threadId() {
                    return get(comment2).id;
                  },
                  get currentUser() {
                    return $$props.currentUser;
                  },
                  get tokenFn() {
                    return tokenFn();
                  },
                  get mentionHref() {
                    return $$props.mentionHref;
                  },
                  get registerMention() {
                    return $$props.registerMention;
                  },
                  get createCommentFn() {
                    return createCommentFn();
                  },
                  onReply: (r2) => appendReply(get(comment2).id, r2)
                });
              });
              append($$anchor4, div_8);
            };
            if_block(node_7, ($$render) => {
              var _a2;
              if ((_a2 = get(comment2).replies) == null ? void 0 : _a2.length) $$render(consequent_5);
            });
          }
          append($$anchor3, fragment_3);
        });
        append($$anchor2, fragment_2);
      };
      if_block(node_3, ($$render) => {
        if (get(loadState) === "loading") $$render(consequent_1);
        else if (get(loadState) === "error") $$render(consequent_2, 1);
        else if (get(comments).length === 0) $$render(consequent_3, 2);
        else if (get(sort) === "time") $$render(consequent_4, 3);
        else $$render(alternate, -1);
      });
    }
    var node_8 = sibling(node_3, 2);
    {
      var consequent_6 = ($$anchor2) => {
        var button_4 = root_6();
        var text_4 = child(button_4);
        template_effect(() => {
          button_4.disabled = get(loadingMore);
          set_text(text_4, get(loadingMore) ? "Loading…" : "Show more comments");
        });
        delegated("click", button_4, loadMoreComments);
        append($$anchor2, button_4);
      };
      if_block(node_8, ($$render) => {
        if (get(loadState) === "ready" && get(commentsHasMore)) $$render(consequent_6);
      });
    }
    bind_this(div_4, ($$value) => set(listEl, $$value), () => get(listEl));
    template_effect(
      ($0) => {
        set_text(text2, get(headerLabel));
        set_attribute(button, "aria-pressed", get(sort) === "thread");
        classes = set_class(button, 1, "", null, classes, { on: get(sort) === "thread" });
        set_attribute(button_1, "aria-pressed", get(sort) === "time");
        classes_1 = set_class(button_1, 1, "", null, classes_1, { on: get(sort) === "time" });
        button_2.disabled = $0;
        set_attribute(button_2, "aria-busy", get(sending));
        set_text(text_1, get(sending) ? "Posting…" : "Comment");
      },
      [() => get(sending) || !get(draft).trim()]
    );
    delegated("click", button, () => set(sort, "thread"));
    delegated("click", button_1, () => set(sort, "time"));
    delegated("click", button_2, sendComment);
    append($$anchor, section);
    pop();
  }
  delegate(["click"]);
  async function downloadPostAsMarkdown({ post: post2, comments = [], categoryName = "", slug = "" }) {
    var _a2, _b2, _c;
    const now = /* @__PURE__ */ new Date();
    function pad2(n) {
      return String(n).padStart(2, "0");
    }
    function ymd(d) {
      return d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate());
    }
    function ts(d) {
      return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes());
    }
    const postDateStr = post2.created ? ymd(new Date(post2.created)) : "";
    const safeTitle = post2.title.replace(/[<>:"\/\\|?*]/g, "").replace(/\s+/g, "_").slice(0, 60);
    const filename = ymd(now) + "_skool_" + safeTitle + (postDateStr ? "_[" + postDateStr + "]" : "") + ".md";
    const postUrl2 = slug && post2.slug ? "https://www.skool.com/" + slug + "/" + post2.slug : window.location.href;
    let md = "# " + post2.title + "\n\n> Template-versie: 1.0\n\n| Veld | Waarde |\n|:---|:---|\n| Platform | skool.com |\n| Auteur | " + (((_a2 = post2.author) == null ? void 0 : _a2.name) || "—") + " |\n| Categorie | " + (categoryName || "—") + " |\n| Datum post | " + (post2.created ? post2.created.slice(0, 10) : "—") + " |\n| Opgeslagen | " + ts(now) + " |\n| URL | " + postUrl2 + " |\n\n---\n\n## Post\n\n" + (post2.contentText || post2.content || "") + "\n";
    if (comments.length > 0) {
      md += "\n\n---\n\n## Reacties (" + comments.length + ")\n\n";
      for (let i = 0; i < comments.length; i++) {
        const c = comments[i];
        const cDate = c.ts ? c.ts.slice(0, 10) : "";
        md += "### Reactie " + (i + 1) + " — " + (((_b2 = c.author) == null ? void 0 : _b2.name) || "") + (cDate ? " (" + cDate + ")" : "") + "\n\n" + (c.contentText || c.content || "") + "\n\n";
        if (c.replies && c.replies.length > 0) {
          for (const r2 of c.replies) {
            md += "> **" + (((_c = r2.author) == null ? void 0 : _c.name) || "") + ":** " + (r2.contentText || r2.content || "") + "\n\n";
          }
        }
      }
    }
    try {
      const result = await chrome.runtime.sendMessage({
        type: "skool-view:download",
        filename,
        markdown: md
      });
      if (!(result == null ? void 0 : result.ok)) {
        console.warn("[skool-view] download via background failed, falling back to anchor", result == null ? void 0 : result.error);
        _anchorDownload(filename, md);
      }
    } catch (err) {
      console.warn("[skool-view] sendMessage failed, falling back to anchor", err);
      _anchorDownload(filename, md);
    }
  }
  function _anchorDownload(filename, markdown) {
    const blob = new Blob([markdown], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }, 200);
  }
  var root$2 = /* @__PURE__ */ from_html(`<div class="placeholder">Select a post to open it here →</div>`);
  var root_1$1 = /* @__PURE__ */ from_html(`<div class="dcat"><span class="catchip"> </span></div>`);
  var root_2$1 = /* @__PURE__ */ from_html(`<article class="dwrap"><div class="pmeta"><!> <div><div class="who"> </div> <div class="when"> </div></div></div> <h1> </h1> <!> <div class="dbody"></div> <!> <!> <button class="act dl-btn" type="button" title="Download as Markdown" aria-label="Download post as Markdown file"><!> Save</button> <!></article>`);
  var root_3$1 = /* @__PURE__ */ from_html(`<main class="detail"><!></main>`);
  function DetailPane($$anchor, $$props) {
    push($$props, true);
    let post2 = prop($$props, "post", 3, null), categoryName = prop($$props, "categoryName", 3, ""), groupId = prop($$props, "groupId", 3, ""), refreshNonce = prop($$props, "refreshNonce", 3, 0), highlightCommentId = prop($$props, "highlightCommentId", 3, ""), pinned = prop($$props, "pinned", 3, false), nativePinned = prop($$props, "nativePinned", 3, false), slug = prop($$props, "slug", 3, ""), onCommentsChange = prop($$props, "onCommentsChange", 3, void 0);
    let loadedComments = /* @__PURE__ */ state(proxy([]));
    user_effect(() => {
      var _a2;
      void ((_a2 = post2()) == null ? void 0 : _a2.id);
      set(loadedComments, [], true);
    });
    let downloading = /* @__PURE__ */ state(false);
    async function handleDownload() {
      if (!post2() || get(downloading)) return;
      set(downloading, true);
      try {
        downloadPostAsMarkdown({
          post: post2(),
          comments: get(loadedComments),
          categoryName: categoryName(),
          slug: slug()
        });
      } finally {
        set(downloading, false);
      }
    }
    var main = root_3$1();
    var node = child(main);
    {
      var consequent = ($$anchor2) => {
        var div = root$2();
        append($$anchor2, div);
      };
      var alternate_1 = ($$anchor2) => {
        var article = root_2$1();
        var div_1 = child(article);
        var node_1 = child(div_1);
        Avatar(node_1, {
          get src() {
            return post2().author.avatar;
          },
          get level() {
            return (post2().author.level) || 0;
          },
          get authorName() {
            return post2().author.name || "";
          },
          size: "md"
        });
        var div_2 = sibling(node_1, 2);
        var div_3 = child(div_2);
        var text$1 = child(div_3);
        var div_4 = sibling(div_3, 2);
        var text_1 = child(div_4);
        var h1 = sibling(div_1, 2);
        var text_2 = child(h1);
        var node_2 = sibling(h1, 2);
        {
          var consequent_1 = ($$anchor3) => {
            var div_5 = root_1$1();
            var span = child(div_5);
            var text_3 = child(span);
            template_effect(() => set_text(text_3, categoryName()));
            append($$anchor3, div_5);
          };
          if_block(node_2, ($$render) => {
            if (categoryName()) $$render(consequent_1);
          });
        }
        var div_6 = sibling(node_2, 2);
        html(div_6, () => toHtml(post2().content, { mentionHref: $$props.mentionHref }), true);
        user_effect(() => {
          void post2()?.id;
          const q = get(activeSearchQuery);
          for (const m of div_6.querySelectorAll("mark.sv-hl")) {
            const p = m.parentNode;
            if (p) { p.replaceChild(document.createTextNode(m.textContent || ""), m); p.normalize(); }
          }
          if (!q) return;
          const walker = document.createTreeWalker(div_6, NodeFilter.SHOW_TEXT, null);
          const nodes = [];
          let n;
          while ((n = walker.nextNode())) nodes.push(n);
          const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
          for (const tn of nodes) {
            const txt = tn.textContent || "";
            if (!re.test(txt)) { re.lastIndex = 0; continue; }
            re.lastIndex = 0;
            const frag = document.createDocumentFragment();
            let last = 0, mt;
            while ((mt = re.exec(txt)) !== null) {
              if (mt.index > last) frag.appendChild(document.createTextNode(txt.slice(last, mt.index)));
              const mk = document.createElement("mark");
              mk.className = "sv-hl";
              mk.textContent = mt[0];
              frag.appendChild(mk);
              last = mt.index + mt[0].length;
            }
            if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
            if (tn.parentNode) tn.parentNode.replaceChild(frag, tn);
          }
          requestAnimationFrame(() => {
            const first = div_6.querySelector("mark.sv-hl");
            if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
          });
        });
        var node_3 = sibling(div_6, 2);
        {
          let $0 = /* @__PURE__ */ user_derived(() => post2().attachments ?? []);
          AttachmentList(node_3, {
            get items() {
              return get($0);
            }
          });
        }
        var node_4 = sibling(node_3, 2);
        PostActions(node_4, {
          get postId() {
            return post2().id;
          },
          get upvotes() {
            return post2().upvotes;
          },
          get pinned() {
            return pinned();
          },
          get nativePinned() {
            return nativePinned();
          },
          get onTogglePin() {
            return $$props.onTogglePin;
          }
        });
        var button = sibling(node_4, 2);
        var node_5 = child(button);
        {
          var consequent_2 = ($$anchor3) => {
            var text_4 = text("⏳");
            append($$anchor3, text_4);
          };
          var alternate = ($$anchor3) => {
            var text_5 = text("⬇");
            append($$anchor3, text_5);
          };
          if_block(node_5, ($$render) => {
            if (get(downloading)) $$render(consequent_2);
            else $$render(alternate, -1);
          });
        }
        var node_6 = sibling(button, 2);
        CommentsSection(node_6, {
          get postId() {
            return post2().id;
          },
          get groupId() {
            return groupId();
          },
          get count() {
            return post2().comments;
          },
          get currentUser() {
            return $$props.currentUser;
          },
          get mentionHref() {
            return $$props.mentionHref;
          },
          get registerMention() {
            return $$props.registerMention;
          },
          get refreshNonce() {
            return refreshNonce();
          },
          get highlightCommentId() {
            return highlightCommentId();
          },
          onCommentsChange: (c) => {
            set(loadedComments, c, true);
            const cb = onCommentsChange();
            if (typeof cb === "function") cb(c);
          }
        });
        template_effect(
          ($0) => {
            set_text(text$1, post2().author.name);
            set_text(text_1, $0);
            set_text(text_2, post2().title);
            button.disabled = get(downloading);
          },
          [() => relativeTime(post2().created)]
        );
        delegated("click", button, handleDownload);
        append($$anchor2, article);
      };
      if_block(node, ($$render) => {
        if (!post2()) $$render(consequent);
        else $$render(alternate_1, -1);
      });
    }
    append($$anchor, main);
    pop();
  }
  delegate(["click"]);
  var root$1 = /* @__PURE__ */ from_html(`<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image preview"><button class="lightbox-backdrop" type="button" aria-label="Close preview"></button> <img class="lightbox-img"/> <button class="lightbox-close" type="button" aria-label="Close preview">×</button></div>`);
  function Lightbox($$anchor, $$props) {
    push($$props, false);
    function onkeydown(e) {
      if (e.key === "Escape") closeLightbox();
    }
    init();
    var fragment = comment$1();
    event("keydown", $window, onkeydown);
    var node = first_child(fragment);
    {
      var consequent = ($$anchor2) => {
        var div = root$1();
        var button = child(div);
        var img = sibling(button, 2);
        var button_1 = sibling(img, 2);
        template_effect(() => {
          set_attribute(img, "src", lightbox.url);
          set_attribute(img, "alt", lightbox.name || "attachment");
        });
        delegated("click", button, function(...$$args) {
          closeLightbox == null ? void 0 : closeLightbox.apply(this, $$args);
        });
        delegated("click", button_1, function(...$$args) {
          closeLightbox == null ? void 0 : closeLightbox.apply(this, $$args);
        });
        append($$anchor2, div);
      };
      if_block(node, ($$render) => {
        if (lightbox.url) $$render(consequent);
      });
    }
    append($$anchor, fragment);
    pop();
  }
  delegate(["click"]);
  const DEFAULT_MAX_PAGES = 200;
  const RATE_LIMIT_BACKOFF_MS = 3e4;
  const ERROR_RETRY_MS = 2e3;
  const PAGE_PAUSE_MS = 100;
  const MAX_CONSECUTIVE_ERRORS = 5;
  const realSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function crawlFeed({
    buildId,
    slug,
    sort,
    labelId,
    fetchFn,
    sleep = realSleep,
    maxPages = DEFAULT_MAX_PAGES,
    signal,
    seedPosts = [],
    onProgress
  }) {
    const byId = /* @__PURE__ */ new Map();
    for (const post2 of seedPosts) {
      if (post2 && post2.id) byId.set(post2.id, post2);
    }
    let page = 1;
    let consecutiveErrors = 0;
    while (page <= maxPages) {
      if (signal == null ? void 0 : signal.aborted) break;
      let result;
      try {
        result = await getFeedPage({ buildId, slug, page, sort, labelId, fetchFn });
      } catch {
        result = { ok: false, status: 0, posts: [] };
      }
      if (!result.ok) {
        consecutiveErrors += 1;
        if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) break;
        await sleep(result.status === 403 ? RATE_LIMIT_BACKOFF_MS : ERROR_RETRY_MS);
        continue;
      }
      consecutiveErrors = 0;
      if (result.posts.length === 0) break;
      let added = 0;
      for (const post2 of result.posts) {
        if (post2 && post2.id && !byId.has(post2.id)) {
          byId.set(post2.id, post2);
          added += 1;
        }
      }
      if (onProgress) {
        onProgress({ page, total: byId.size, added, posts: [...byId.values()] });
      }
      page += 1;
      await sleep(PAGE_PAUSE_MS);
    }
    return [...byId.values()];
  }
  function togglePinId(ids, id) {
    return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  }
  function isPinned(post2, localPinnedIds) {
    if (!post2) return false;
    return Boolean(post2.pinned) || localPinnedIds.has(post2.id);
  }
  const cacheKey = (slug) => `skfeed:${slug}`;
  const pinsKey = (slug) => `skpins:${slug}`;
  const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;
  async function loadCachedFeed(slug) {
    try {
      const key = cacheKey(slug);
      const got = await browser.storage.local.get(key);
      const entry = (
        /** @type {{ posts?: unknown, fetchedAt?: number }} */
        (got == null ? void 0 : got[key]) ?? {}
      );
      if (!Array.isArray(entry.posts)) return [];
      if (entry.fetchedAt && Date.now() - entry.fetchedAt > CACHE_MAX_AGE_MS) return [];
      return /** @type {PostView[]} */ (entry.posts);
    } catch {
      return [];
    }
  }
  async function saveCachedFeed(slug, posts) {
    try {
      await browser.storage.local.set({ [cacheKey(slug)]: { posts, fetchedAt: Date.now() } });
    } catch {
    }
  }
  async function loadPinnedIds(slug) {
    try {
      const key = pinsKey(slug);
      const got = await browser.storage.local.get(key);
      const ids = (
        /** @type {unknown} */
        got == null ? void 0 : got[key]
      );
      const result = Array.isArray(ids) ? ids.filter((x) => typeof x === "string") : [];
      return result;
    } catch (e) {
      console.warn("[sv-pin] loadPinnedIds FOUT:", e);
      return [];
    }
  }
  async function savePinnedIds(slug, ids) {
    try {
      const key = pinsKey(slug);
      await browser.storage.local.set({ [key]: Array.from(ids) });
    } catch (e) {
      console.warn("[sv-pin] savePinnedIds FOUT:", e);
    }
  }
  function createFeedStore({ buildId, slug, fetchFn }) {
    let allPosts = /* @__PURE__ */ state(proxy([]));
    let status = /* @__PURE__ */ state("idle");
    let error = /* @__PURE__ */ state("");
    let category = /* @__PURE__ */ state("");
    let sort = /* @__PURE__ */ state("newest");
    let indexed = /* @__PURE__ */ state(0);
    let localPinIds = /* @__PURE__ */ state(proxy([]));
    const pinnedSet = /* @__PURE__ */ user_derived(() => new Set(get(localPinIds)));
    let crawlToken = 0;
    let started = false;
    let _crawlAbort = null;
    function present() {
      const inCategory = filterByCategory(get(allPosts), get(category));
      const sorted = sortPosts(inCategory, get(sort));
      if (get(sort) !== "gems") return sorted;
      const shown = new Set(sorted.map((p) => p.id));
      const droppedPins = inCategory.filter((p) => isPinned(p, get(pinnedSet)) && !shown.has(p.id));
      return [...droppedPins, ...sorted];
    }
    async function runCrawl() {
      if (_crawlAbort) _crawlAbort.abort();
      _crawlAbort = new AbortController();
      _abortActiveCrawl = () => _crawlAbort.abort();
      const signal = _crawlAbort.signal;
      const token = ++crawlToken;
      set(status, "loading");
      set(error, "");
      try {
        const posts = await crawlFeed({
          buildId,
          slug,
          /** @type {any} */
          fetchFn,
          signal,
          seedPosts: get(allPosts),
          onProgress: ({ total, posts: snapshot }) => {
            if (token !== crawlToken) return;
            set(allPosts, snapshot, true);
            set(indexed, total, true);
            if (typeof _onFeedProgress === "function") _onFeedProgress(snapshot, buildId, slug);
          }
        });
        if (token !== crawlToken) return;
        set(allPosts, posts, true);
        set(indexed, posts.length, true);
        set(status, "ready");
        void saveCachedFeed(slug, posts);
        if (typeof _onFeedReady === "function") _onFeedReady(posts, buildId, slug);
      } catch (err) {
        if (token !== crawlToken) return;
        set(error, err instanceof Error ? err.message : "Failed to load posts.", true);
        set(status, "error");
      }
    }
    async function start() {
      if (started) return;
      started = true;
      set(status, "loading");
      set(localPinIds, await loadPinnedIds(slug), true);
      const cached2 = await loadCachedFeed(slug);
      if (cached2.length) {
        set(allPosts, cached2, true);
        set(indexed, cached2.length, true);
      }
      await runCrawl();
    }
    return {
      /** The presented (category-filtered, sorted) post list. */
      get posts() {
        return present();
      },
      get status() {
        return get(status);
      },
      get error() {
        return get(error);
      },
      get category() {
        return get(category);
      },
      get sort() {
        return get(sort);
      },
      /** Total posts in the crawled corpus (before category filtering). */
      get total() {
        return get(allPosts).length;
      },
      /** Posts indexed so far during the crawl (for a progress meter). */
      get indexed() {
        return get(indexed);
      },
      /** A crawl is in flight. */
      get isCrawling() {
        return get(status) === "loading";
      },
      /** First load with nothing to show yet (drives the full-pane spinner). */
      get isInitialLoading() {
        return get(status) === "loading" && get(allPosts).length === 0;
      },
      start,
      /** Whether a post shows as pinned in our view: native Skool pin OR a local pin. */
      isPinned(post2) {
        return isPinned(post2, get(pinnedSet));
      },
      /**
       * Toggle a LOCAL pin for a post (client-side only; never touches Skool). No-op for natively
       * pinned posts — those are read-only and can't be unpinned from our side.
       * @param {string} id
       * @param {boolean} [nativePinned] True if the post is pinned by Skool.
       */
      togglePin(id, nativePinned = false) {
        if (!id || nativePinned) return;
        set(localPinIds, togglePinId(get(localPinIds), id), true);
        void savePinnedIds(slug, get(localPinIds));
      },
      /** Change the category filter — instant, no refetch (pure derivation). */
      setCategory(labelId) {
        set(category, labelId ?? "", true);
      },
      /** Change the sort mode — instant, no refetch (pure derivation). */
      setSort(value) {
        set(sort, value, true);
      },
      /** Retry a failed crawl (keeps any posts already loaded). */
      retry() {
        if (get(status) === "error") void runCrawl();
      },
      /** Manual refresh — re-crawl from page 1, merging new posts into the corpus. */
      refresh() {
        void runCrawl();
      }
    };
  }
  var root = /* @__PURE__ */ from_html(`<main class="sv-boot"><div class="empty">Open a Skool community to use this view.<br/> Navigate to a community (e.g. <code>skool.com/your-group</code>) and toggle again.</div></main>`);
  var root_1 = /* @__PURE__ */ from_html(`<main class="sv-boot"><div class="empty">Loading community…</div></main>`);
  var root_2 = /* @__PURE__ */ from_html(`<main class="sv-boot"><div class="empty"> <br/> <button class="btn sm" type="button">Retry</button></div></main>`);
  var root_3 = /* @__PURE__ */ from_html(`<div class="layout"><!> <div class="resize-handle" title="Sleep om breedte aan te passen"></div> <!></div>`);
  var root_4 = /* @__PURE__ */ from_html(`<div class="sv-root"><!> <!> <!></div>`);
  function App($$anchor, $$props) {
    push($$props, true);
    let theme = /* @__PURE__ */ state(proxy(loadTheme()));
    function changeTheme(next) {
      set(theme, next, true);
      saveTheme(next);
    }
    function handleExit() {
      if (typeof $$props.onClose === "function") $$props.onClose();
    }
    let selectedId = /* @__PURE__ */ state(null);
    let openedPost = /* @__PURE__ */ state(null);
    let highlightCommentId = /* @__PURE__ */ state("");
    let buildId = /* @__PURE__ */ state("");
    let bootState = /* @__PURE__ */ state("loading");
    let bootError = /* @__PURE__ */ state("");
    let groupName = /* @__PURE__ */ state("Community");
    let groupIcon = /* @__PURE__ */ state("");
    let groupId = /* @__PURE__ */ state("");
    let currentUser = /* @__PURE__ */ state(void 0);
    let slug = /* @__PURE__ */ state("");
    user_effect(() => {
      const host = document.getElementById("skool-view-host");
      if (host) host.style.zoom = get(zoom) === 100 ? "" : get(zoom) + "%";
      const floatLabel = document.getElementById("sv-zoom-float-label");
      if (floatLabel) floatLabel.textContent = get(zoom) + "%";
    });
    const LIST_WIDTH_KEY = "sv-list-width";
    const ZOOM_KEY = "sv-zoom";
    const ZOOM_MIN = 70;
    const ZOOM_MAX = 150;
    const ZOOM_STEP = 10;
    let zoom = /* @__PURE__ */ state(proxy(Number(localStorage.getItem(ZOOM_KEY)) || 100));
    function changeZoom(delta) {
      set(zoom, Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, get(zoom) + delta)), true);
      localStorage.setItem(ZOOM_KEY, String(get(zoom)));
    }
    _changeZoom = changeZoom;
    let listWidth = /* @__PURE__ */ state(proxy(Number(localStorage.getItem(LIST_WIDTH_KEY)) || 400));
    function startResize(e) {
      e.preventDefault();
      const startX = e.clientX;
      const startW = get(listWidth);
      function onMove(ev) {
        const w = Math.max(200, Math.min(700, startW + ev.clientX - startX));
        set(listWidth, w, true);
      }
      function onUp() {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        localStorage.setItem(LIST_WIDTH_KEY, String(get(listWidth)));
      }
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    }
    const mentionHandles = /* @__PURE__ */ new Map();
    function registerMention(id, handle) {
      if (id && handle) mentionHandles.set(id, handle);
    }
    function mentionHref(id) {
      const handle = mentionHandles.get(id);
      return handle && get(slug) ? profileUrl(handle, get(slug)) : null;
    }
    let categories = /* @__PURE__ */ state(proxy([]));
    let feedStore = /* @__PURE__ */ state(null);
    let refreshNonce = /* @__PURE__ */ state(0);
    function refreshView() {
      var _a2;
      (_a2 = get(feedStore)) == null ? void 0 : _a2.refresh();
      set(refreshNonce, get(refreshNonce) + 1);
      void loadNotifications();
    }
    let notifItems = /* @__PURE__ */ state(proxy([]));
    let notifStatus = /* @__PURE__ */ state("idle");
    let notifCursor = /* @__PURE__ */ state("");
    let notifHasMore = /* @__PURE__ */ state(false);
    let unreadCount = /* @__PURE__ */ state(0);
    async function loadNotifications() {
      if (get(notifStatus) === "loading") return;
      set(notifStatus, "loading");
      try {
        const wafToken = await getWafToken();
        const { items, hasMore, cursor } = await getNotifications({ wafToken });
        set(notifItems, items, true);
        set(unreadCount, items.filter((n) => n.unread).length);
        set(notifHasMore, hasMore, true);
        set(notifCursor, cursor, true);
        set(notifStatus, "ready");
      } catch {
        set(notifStatus, "error");
      }
    }
    async function loadMoreNotifications() {
      if (get(notifStatus) === "loading" || !get(notifHasMore) || !get(notifCursor)) return;
      set(notifStatus, "loading");
      try {
        const wafToken = await getWafToken();
        const { items, hasMore, cursor } = await getNotifications({ wafToken, cursor: get(notifCursor) });
        set(notifItems, [...get(notifItems), ...items], true);
        set(unreadCount, get(unreadCount) + items.filter((n) => n.unread).length);
        set(notifHasMore, hasMore, true);
        set(notifCursor, cursor, true);
        set(notifStatus, "ready");
      } catch {
        set(notifStatus, "error");
      }
    }
    function communitySlug(pathname) {
      const first = pathname.split("/").filter(Boolean)[0];
      if (!first) return null;
      const reserved = /* @__PURE__ */ new Set([
        "_next",
        "login",
        "signup",
        "discovery",
        "settings",
        "pricing",
        "about",
        "terms",
        "privacy"
      ]);
      return reserved.has(first.toLowerCase()) ? null : first;
    }
    async function boot() {
      const detectedSlug = communitySlug(window.location.pathname);
      if (!detectedSlug) {
        set(bootState, "off-community");
        return;
      }
      set(slug, detectedSlug, true);
      try {
        // First: extract levels from the page that's already loaded in the browser
        try {
          const nd = /** @type {any} */ (window).__NEXT_DATA__;
          if (nd) ingestFeedLevels(nd?.props ?? nd);
        } catch {}
        const res = await fetch(`/${get(slug)}`, { credentials: "include", headers: { Accept: "text/html" } });
        if (!res.ok) throw new Error(`Page load failed (${res.status})`);
        const html2 = await res.text();
        const ndMatch = /<script[^>]+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html2);
        const nd = ndMatch ? (() => { try { return JSON.parse(ndMatch[1]); } catch { return null; } })() : null;
        try {
          if (nd) ingestFeedLevels(nd?.props ?? nd);
        } catch {}
        const buildIdMatch = /"buildId"\s*:\s*"([^"]+)"/.exec(html2);
        if (!buildIdMatch) throw new Error("Could not read the community build id.");
        set(buildId, buildIdMatch[1], true);
        set(categories, parseCategories(html2), true);
        const nameMatch = /"displayName"\s*:\s*"([^"]+)"/.exec(html2);
        set(groupName, nameMatch ? decodeJsonString(nameMatch[1]) : get(slug), true);
        try {
          if (nd) {
            const pp2 = nd?.props?.pageProps;
            const grp2 = pp2?.group ?? pp2?.currentGroup ?? pp2?.community;
            const meta2 = grp2?.metadata ?? {};
            const photoUrl2 = meta2.logoUrl ?? meta2.logoBigUrl ?? meta2.faviconUrl;
            if (photoUrl2) set(groupIcon, photoUrl2, true);
          }
        } catch (e) { console.warn("[skool-view] logo fout:", e); }
        const groupIdMatch = /"currentGroup"\s*:\s*\{\s*"id"\s*:\s*"([^"]+)"/.exec(html2);
        set(groupId, groupIdMatch ? groupIdMatch[1] : "", true);
        set(currentUser, parseSelf(html2), true);
        _scrollListenerAttached = false;
        _prefetchedIds.clear();
        set(_postStatOverrides, new Map(), true);
        _statPersistData = {};
        await _loadAndApplyStatCache();
        set(feedStore, createFeedStore({ buildId: get(buildId), slug: get(slug) }), true);
        const _bid = get(buildId);
        const _sl = get(slug);
        // Callback voor elke pagina die binnenkomt tijdens de crawl — begin direct te prefetchen
        _onFeedProgress = (snapshot, bid, sl) => {
          _allFeedPosts = snapshot;
          void _prefetchBatch(snapshot, bid, sl, 30);
          // Scroll-detectie eenmalig instellen zodra DOM klaar is
          if (!_scrollListenerAttached) {
            _scrollListenerAttached = true;
            setTimeout(() => {
              const host = document.getElementById("skool-view-host");
              const listpane = host?.shadowRoot?.querySelector(".listpane");
              if (!listpane) return;
              let _scrollBusy = false;
              _listpaneScrollHandler = () => {
                if (_scrollBusy) return;
                _scrollBusy = true;
                requestAnimationFrame(() => {
                  _scrollBusy = false;
                  const { scrollTop, scrollHeight, clientHeight } = listpane;
                  if (scrollHeight - scrollTop - clientHeight < 600) {
                    void _prefetchBatch(_allFeedPosts, _bid, _sl, 20);
                  }
                });
              };
              _listpaneScrollEl = listpane;
              listpane.addEventListener("scroll", _listpaneScrollHandler);
            }, 800);
          }
        };
        // Fallback voor als onProgress nooit vuurt (alles uit cache)
        _onFeedReady = (posts, bid, sl) => {
          void _prefetchBatch(posts, bid, sl, 30);
        };
        set(bootState, "ready");
        void loadNotifications();
        void loadMemberLevels(get(buildId), get(slug), get(groupId));
      } catch (err) {
        set(
          bootError,
          err instanceof Error ? err.message : "Something went wrong loading this community.",
          true
        );
        set(bootState, "error");
      }
    }
    function parseSelf(html2) {
      var _a2, _b2, _c;
      const start = /"self"\s*:\s*\{/.exec(html2);
      if (!start) return void 0;
      const slice = html2.slice(start.index, start.index + 2e3);
      const first = ((_a2 = /"first_?[Nn]ame"\s*:\s*"([^"]*)"/.exec(slice)) == null ? void 0 : _a2[1]) ?? "";
      const last = ((_b2 = /"last_?[Nn]ame"\s*:\s*"([^"]*)"/.exec(slice)) == null ? void 0 : _b2[1]) ?? "";
      const avatar = ((_c = /"picture_?[Bb]ubble"\s*:\s*"([^"]*)"/.exec(slice)) == null ? void 0 : _c[1]) ?? "";
      const name = decodeJsonString(`${first} ${last}`.trim());
      if (!name && !avatar) return void 0;
      return {
        name: name || "You",
        avatar: avatar ? decodeJsonString(avatar) : ""
      };
    }
    function decodeJsonString(value) {
      return value.replace(/\\u([0-9a-fA-F]{4})/g, (_m, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    function selectPost(id) {
      var _a2;
      const feedPost = (_a2 = get(feedStore)) == null ? void 0 : _a2.posts.find((p) => p.id === id);
      set(selectedId, id, true);
      set(
        openedPost,
        null
        // show the feed preview instantly; the full body swaps in when it loads
      );
      set(highlightCommentId, "");
      void loadFullPost(id, feedPost == null ? void 0 : feedPost.slug);
    }
    async function loadFullPost(id, postSlug) {
      if (!postSlug || !get(buildId)) return;
      try {
        const { post: post2 } = await getPost({ buildId: get(buildId), slug: get(slug), postSlug });
        if (post2 && get(
          selectedId
          // ignore if the user moved on
        ) === id) {
          set(openedPost, post2, true);
          // Gebruik de correcte counts uit de getPost API-response
          const upvotes = typeof post2.upvotes === "number" ? post2.upvotes : null;
          const comments = typeof post2.comments === "number" ? post2.comments : null;
          if (upvotes != null || comments != null) {
            setPostStatOverride(id, upvotes, comments);
          }
        }
      } catch {
      }
    }
    async function markNotifRead(id) {
      if (!id) return;
      try {
        const wafToken = await getWafToken();
        const res = await fetch(`https://api2.skool.com/messages/${id}/read`, {
          method: "POST", credentials: "include",
          headers: { "accept": "application/json", "content-type": "application/json", "x-aws-waf-token": wafToken ?? "" },
          body: "{}"
        });
        console.info(`[skool-view] mark-read ${id} → ${res.status}`);
      } catch (err) { console.warn("[skool-view] mark-read failed:", err); }
    }
    async function markNotifUnread(id) {
      if (!id) return;
      try {
        const wafToken = await getWafToken();
        const res = await fetch(`https://api2.skool.com/messages/${id}/unread`, {
          method: "POST", credentials: "include",
          headers: { "accept": "application/json", "content-type": "application/json", "x-aws-waf-token": wafToken ?? "" },
          body: "{}"
        });
        console.info(`[skool-view] mark-unread ${id} → ${res.status}`);
      } catch (err) { console.warn("[skool-view] mark-unread failed:", err); }
    }
    async function openNotificationTarget(n) {
      var _a2;
      if (n.unread) {
        set(unreadCount, Math.max(0, get(unreadCount) - 1));
        set(notifItems, get(notifItems).map((item) => item.id === n.id ? { ...item, unread: false } : item), true);
        markNotifRead(n.id);
      }
      set(highlightCommentId, n.commentId || "", true);
      set(selectedId, n.rootPostId, true);
      set(
        openedPost,
        null
        // the feed preview (if any) shows until the full post loads
      );
      const inFeed = (_a2 = get(feedStore)) == null ? void 0 : _a2.posts.find((p) => p.id === n.rootPostId);
      if (n.postSlug && get(buildId)) {
        try {
          const { post: post2 } = await getPost({
            buildId: get(buildId),
            slug: get(slug),
            postSlug: n.postSlug
          });
          if (post2 && get(selectedId) === n.rootPostId) {
            set(openedPost, post2, true);
            return;
          }
        } catch {
        }
      }
      if (!inFeed && n.href) window.location.href = n.href;
    }
    async function toggleNotification(n) {
      const nowUnread = !n.unread;
      set(notifItems, get(notifItems).map((item) => item.id === n.id ? { ...item, unread: nowUnread } : item), true);
      set(unreadCount, get(notifItems).filter((item) => item.unread).length);
      if (!nowUnread) {
        markNotifRead(n.id);
      } else {
        markNotifUnread(n.id);
      }
    }
    async function markAllRead() {
      const items = get(notifItems);
      set(notifItems, items.map((item) => ({ ...item, unread: false })), true);
      set(unreadCount, 0);
      try {
        // Try batch endpoint first
        // Mark each unread notification individually (no confirmed batch endpoint)
        await Promise.all(items.filter((item) => item.unread).map((item) => markNotifRead(item.id)));
      } catch (err) {
        console.warn("[skool-view] notif mark-all-read failed:", err);
      }
    }
    const selectedPost = /* @__PURE__ */ user_derived(() => {
      var _a2;
      if (!get(selectedId)) return null;
      if (get(openedPost) && get(openedPost).id === get(selectedId)) return get(openedPost);
      return ((_a2 = get(feedStore)) == null ? void 0 : _a2.posts.find((p) => p.id === get(selectedId))) ?? null;
    });
    const categoryNameById = /* @__PURE__ */ user_derived(() => new Map(get(categories).map((c) => [c.id, c.name])));
    const selectedCategoryName = /* @__PURE__ */ user_derived(() => {
      var _a2;
      return ((_a2 = get(selectedPost)) == null ? void 0 : _a2.labelId) ? get(categoryNameById).get(get(selectedPost).labelId) ?? "" : "";
    });
    boot();
    var div = root_4();
    var node = child(div);
    Topbar(node, {
      get groupName() {
        return get(groupName);
      },
      get groupIcon() {
        return get(groupIcon);
      },
      get theme() {
        return get(theme);
      },
      get zoom() {
        return get(zoom);
      },
      onZoomIn: () => changeZoom(ZOOM_STEP),
      onZoomOut: () => changeZoom(-ZOOM_STEP),
      onThemeChange: changeTheme,
      onExit: handleExit,
      onRefresh: refreshView,
      get notifItems() {
        return get(notifItems);
      },
      get notifStatus() {
        return get(notifStatus);
      },
      get notifHasMore() {
        return get(notifHasMore);
      },
      get unreadCount() {
        return get(unreadCount);
      },
      onOpenNotifications: loadNotifications,
      onLoadMoreNotifications: loadMoreNotifications,
      onOpenNotification: openNotificationTarget,
      onToggleNotification: toggleNotification,
      onMarkAllReadNotifications: markAllRead
    });
    var node_1 = sibling(node, 2);
    {
      var consequent = ($$anchor2) => {
        var main = root();
        append($$anchor2, main);
      };
      var consequent_1 = ($$anchor2) => {
        var main_1 = root_1();
        append($$anchor2, main_1);
      };
      var consequent_2 = ($$anchor2) => {
        var main_2 = root_2();
        var div_1 = child(main_2);
        var text2 = child(div_1);
        var button = sibling(text2, 3);
        template_effect(() => set_text(text2, get(bootError)));
        delegated("click", button, boot);
        append($$anchor2, main_2);
      };
      var consequent_3 = ($$anchor2) => {
        var div_2 = root_3();
        var node_2 = child(div_2);
        FeedList(node_2, {
          get store() {
            return get(feedStore);
          },
          get categories() {
            return get(categories);
          },
          get selectedId() {
            return get(selectedId);
          },
          onSelect: selectPost,
          get listWidth() {
            return get(listWidth);
          }
        });
        var div_3 = sibling(node_2, 2);
        var node_3 = sibling(div_3, 2);
        {
          let $0 = /* @__PURE__ */ user_derived(() => {
            var _a2;
            return ((_a2 = get(feedStore)) == null ? void 0 : _a2.isPinned(get(selectedPost))) ?? false;
          });
          let $1 = /* @__PURE__ */ user_derived(() => {
            var _a2;
            return ((_a2 = get(selectedPost)) == null ? void 0 : _a2.pinned) ?? false;
          });
          DetailPane(node_3, {
            get post() {
              return get(selectedPost);
            },
            get categoryName() {
              return get(selectedCategoryName);
            },
            get groupId() {
              return get(groupId);
            },
            get slug() {
              return get(slug);
            },
            get currentUser() {
              return get(currentUser);
            },
            mentionHref,
            registerMention,
            get refreshNonce() {
              return get(refreshNonce);
            },
            get highlightCommentId() {
              return get(highlightCommentId);
            },
            get pinned() {
              return get($0);
            },
            get nativePinned() {
              return get($1);
            },
            onTogglePin: (id) => {
              var _a2, _b2;
              return (_b2 = get(feedStore)) == null ? void 0 : _b2.togglePin(id, ((_a2 = get(selectedPost)) == null ? void 0 : _a2.pinned) ?? false);
            },
            onCommentsChange: (c) => {
              // Intentioneel leeg: de correcte totalen komen al uit result.parentUpvotes/parentComments
              // in de Comments load() functie. c.length is alleen de eerste pagina — nooit overschrijven.
            }
          });
        }
        template_effect(() => set_style(div_2, `--list-w: ${get(listWidth) ?? ""}px`));
        delegated("mousedown", div_3, startResize);
        append($$anchor2, div_2);
      };
      if_block(node_1, ($$render) => {
        if (get(bootState) === "off-community") $$render(consequent);
        else if (get(bootState) === "loading") $$render(consequent_1, 1);
        else if (get(bootState) === "error") $$render(consequent_2, 2);
        else if (get(feedStore)) $$render(consequent_3, 3);
      });
    }
    var node_4 = sibling(node_1, 2);
    Lightbox(node_4, {});
    template_effect(() => set_attribute(div, "data-theme", get(theme) === "default" ? null : get(theme)));
    append($$anchor, div);
    pop();
  }
  delegate(["click", "mousedown"]);
  const overlayCss = '/* Overlay styles for skool-view, injected into the shadow root by the content script (a\n   head-injected <style> can\'t cross the shadow boundary). Ported from the prototype styles.\n   Two adaptations for the shadow DOM:\n     1. Design tokens live on `.sv-root` (not `:root`/<html>) so they resolve inside the shadow.\n     2. Themes are `.sv-root[data-theme="…"]` (App stamps `data-theme` on .sv-root, not <html>).\n   Class names are plain (no Svelte scoping) so they match the markup inside the shadow root. */\n\n/* ---- design tokens (default / dark) ---- */\n.sv-root {\n  color-scheme: dark;\n  --bg: #0e1116;\n  --panel: #161b22;\n  --panel-2: #1c2230;\n  --line: #2a3140;\n  --text: #e6edf3;\n  --muted: #8b949e;\n  --accent: #58a6ff;\n  --accent-hover: color-mix(in oklab, var(--accent), black 12%);\n  --accent-2: #f78166;\n  --good: #3fb950;\n  --radius: 12px;\n  --topbar-h: 56px;\n  --font: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;\n  --listbg: #0c0f14;\n  --rowdiv: #1a1f29;\n  --bodytext: #c9d1d9;\n  --btn-fg: #07101f;\n}\n\n/* ---- Discord theme ---- */\n.sv-root[data-theme="discord"] {\n  --bg: #313338;\n  --listbg: #2b2d31;\n  --panel: #1e1f22;\n  --panel-2: color-mix(in oklab, #4e5058 55%, #2b2d31);\n  --line: #3f4147;\n  --rowdiv: rgba(255, 255, 255, 0.04);\n  --text: #dbdee1;\n  --bodytext: #dbdee1;\n  --muted: #949ba4;\n  --accent: #5865f2;\n  --accent-hover: #4752c4;\n  --accent-2: #5865f2;\n  --good: #23a55a;\n  --btn-fg: #ffffff;\n  --radius: 8px;\n  --font: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;\n}\n\n/* ---- MiniMax theme (light) ---- */\n.sv-root[data-theme="minimax"] {\n  color-scheme: light;\n  --bg: #ffffff;\n  --listbg: #fafafa;\n  --panel: #f0f2f5;\n  --panel-2: #e7eaef;\n  --line: #e5e7eb;\n  --rowdiv: #eceef1;\n  --text: #222222;\n  --bodytext: #353a42;\n  --muted: #45515e;\n  --accent: #1456f0;\n  --accent-hover: #2563eb;\n  --accent-2: #1456f0;\n  --brand-pink: #ea5ec1;\n  --good: #16a34a;\n  --btn-fg: #ffffff;\n  --radius: 13px;\n  --font: Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;\n}\n\n/* ---- root container (replaces the prototype\'s body) ---- */\n.sv-root {\n  position: fixed;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n  background: var(--bg);\n  color: var(--text);\n  font: 16px/1.5 var(--font);\n  overflow: hidden;\n}\n.sv-root *,\n.sv-root *::before,\n.sv-root *::after {\n  box-sizing: border-box;\n}\n.sv-root button {\n  font: inherit;\n  cursor: pointer;\n}\n.sv-root img {\n  display: block;\n}\n.sv-root [hidden] {\n  display: none !important;\n}\n\n/* ---- focus visibility (keyboard a11y) ---- */\n.sv-root :where(a, button, [role="button"], [tabindex]):focus-visible {\n  outline: 2px solid var(--accent);\n  outline-offset: 2px;\n}\n.sv-root .row:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 2px var(--accent);\n}\n.sv-root .sortsel:focus-visible {\n  outline: none;\n  border-color: var(--accent);\n  box-shadow: 0 0 0 2px color-mix(in oklab, var(--accent), transparent 70%);\n}\n\n/* ---- empty / loading / error states ---- */\n.sv-root .empty {\n  color: var(--muted);\n  font-size: 13px;\n  text-align: center;\n  padding: 28px 16px;\n  line-height: 1.6;\n}\n.sv-boot {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sv-boot code {\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 12px;\n  color: var(--text);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .sv-root *,\n  .sv-root *::before,\n  .sv-root *::after {\n    transition-duration: 0.01ms !important;\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}\n\n/* ---- top bar ---- */\n.sv-root .topbar {\n  height: var(--topbar-h);\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  padding: 0 20px 0 16px;\n  background: var(--listbg);\n  border-bottom: 1px solid var(--line);\n}\n.sv-root .topbar-left {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.sv-root .brand {\n  font-weight: 700;\n  font-size: 16px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.sv-root .brand-mark {\n  color: var(--brand-pink, currentColor);\n}\n.sv-root .group-icon {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  object-fit: cover;\n  display: inline-block;\n  vertical-align: middle;\n}\n.sv-root .tabs {\n  display: flex;\n  gap: 4px;\n  margin-left: auto;\n}\n.sv-root .tabs button {\n  background: transparent;\n  color: var(--muted);\n  border: 0;\n  padding: 8px 14px;\n  border-radius: 8px;\n  font-weight: 600;\n}\n.sv-root .tabs button:hover {\n  color: var(--text);\n  background: var(--panel);\n}\n.sv-root .tabs button.active {\n  color: var(--text);\n  background: var(--panel-2);\n}\n.sv-root .themesel {\n  margin-left: 4px;\n}\n\n/* ---- topbar icon actions (exit ghost button) ---- */\n.sv-root .iconbtn {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 34px;\n  height: 34px;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--muted);\n}\n.sv-root .iconbtn:hover:not(:disabled) {\n  color: var(--text);\n  background: var(--panel);\n}\n.sv-root .iconbtn .ic {\n  width: 19px;\n  height: 19px;\n}\n.sv-root .exitbtn {\n  width: 24px;\n  height: 24px;\n}\n\n/* ---- topbar right cluster: refresh / notifications / chat (step 6) ---- */\n.sv-root .topbar-right {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n.sv-root .notif-wrap {\n  position: relative;\n}\n.sv-root .notif-badge {\n  position: absolute;\n  top: 1px;\n  right: 1px;\n  min-width: 15px;\n  height: 15px;\n  padding: 0 3px;\n  box-sizing: border-box;\n  border-radius: 999px;\n  background: var(--accent-2);\n  color: #fff;\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 15px;\n  text-align: center;\n}\n.sv-root .notif-panel {\n  position: absolute;\n  z-index: 20;\n  top: calc(100% + 6px);\n  right: 0;\n  width: 320px;\n  max-height: 60vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: var(--panel-2);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);\n}\n.sv-root .notif-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 12px;\n  font-weight: 700;\n  border-bottom: 1px solid var(--line);\n}\n.sv-root .notif-list {\n  overflow-y: auto;\n}\n.sv-root .notif-empty {\n  padding: 28px 16px;\n  text-align: center;\n  color: var(--muted);\n  font-size: 13px;\n}\n.sv-root .notif-item {\n  display: flex;\n  gap: 10px;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--rowdiv);\n  color: var(--text);\n  text-decoration: none;\n  align-items: center;\n}\n.sv-root .notif-item:hover {\n  background: var(--panel);\n}\n.sv-root .notif-item.unread {\n  background: color-mix(in oklab, var(--accent), transparent 88%);\n}\n.sv-root .notif-dot {\n  flex-shrink: 0;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid var(--accent);\n  background: transparent;\n  padding: 0;\n  margin-left: auto;\n  cursor: pointer;\n  transition: background 0.1s, opacity 0.15s;\n  align-self: center;\n}\n.sv-root .notif-dot.is-unread {\n  background: var(--accent);\n}\n.sv-root .notif-dot:hover {\n  opacity: 0.65;\n}\n.sv-root .notif-markall {\n  background: none;\n  border: none;\n  color: var(--accent);\n  font-size: 12px;\n  cursor: pointer;\n  padding: 0;\n  margin-right: auto;\n}\n.sv-root .notif-markall:hover {\n  text-decoration: underline;\n}\n.sv-root .notif-body {\n  min-width: 0;\n}\n.sv-root .notif-text {\n  font-size: 13px;\n  color: var(--bodytext);\n}\n.sv-root .notif-preview {\n  font-size: 12px;\n  color: var(--muted);\n  margin-top: 2px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.sv-root .notif-time {\n  font-size: 11px;\n  color: var(--muted);\n  margin-top: 2px;\n}\n.sv-root .notif-close {\n  width: 24px;\n  height: 24px;\n  font-size: 18px;\n  line-height: 1;\n}\n.sv-root .notif-more {\n  display: block;\n  width: calc(100% - 24px);\n  margin: 8px 12px 12px;\n}\n\n/* ---- two-pane layout ---- */\n.sv-root .layout {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n}\n.sv-root .listpane {\n  width: 400px;\n  flex: none;\n  border-right: 1px solid var(--line);\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto;\n  background: var(--listbg);\n}\n.sv-root .listhead {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px 16px;\n  background: var(--listbg);\n  border-bottom: 1px solid var(--line);\n}\n.sv-root .lh-controls {\n  display: flex;\n  gap: 8px;\n}\n.sv-root .lh-controls select {\n  flex: 1;\n  min-width: 0;\n}\n.sv-root .sortsel {\n  background: var(--panel);\n  color: var(--text);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 5px 9px;\n  font-size: 13px;\n}\n.sv-root .sub {\n  color: var(--muted);\n  font-size: 13px;\n  min-height: 1em;\n}\n\n/* ---- list rows ---- */\n.sv-root .list {\n  display: flex;\n  flex-direction: column;\n  padding: 8px;\n  gap: 6px;\n}\n.sv-root .listdiv {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--muted);\n  padding: 10px 16px 6px;\n  background: var(--listbg);\n}\n.sv-root .row {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  padding: 12px 16px;\n  background: var(--panel);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  cursor: pointer;\n}\n.sv-root .row:hover {\n  background: var(--panel-2);\n  border-color: var(--accent);\n}\n.sv-root .row.selected {\n  background: var(--panel-2);\n  border-color: var(--accent);\n  box-shadow: inset 3px 0 0 var(--accent);\n}\n.sv-root .pinbtn {\n  font-size: 14px;\n  line-height: 1;\n  width: 24px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  filter: grayscale(1) opacity(0.35);\n  flex: none;\n  /* Reset native button chrome so the glyph reads as an inline control. */\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n}\n.sv-root .row:hover .pinbtn {\n  filter: grayscale(1) opacity(0.6);\n}\n.sv-root .pinbtn:hover:not(:disabled) {\n  filter: none;\n}\n.sv-root .pinbtn.on {\n  filter: none;\n}\n.sv-root .pinbtn:disabled {\n  cursor: default;\n}\n.sv-root .rmain {\n  min-width: 0;\n}\n.sv-root .rtitle {\n  font-weight: 600;\n  font-size: 14px;\n  margin-bottom: 2px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.sv-root .rmeta {\n  color: var(--muted);\n  font-size: 12px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  min-width: 0;\n}\n.sv-root .rname {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n}\n.sv-root .rstat {\n  flex: none;\n  white-space: nowrap;\n}\n.sv-root .rprev {\n  color: var(--muted);\n  font-size: 12px;\n  line-height: 1.4;\n  margin: 2px 0 4px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.sv-root .rcat {\n  margin: 2px 0 6px;\n  max-width: 100%;\n}\n.sv-root .catchip {\n  display: inline-flex;\n  align-items: center;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.45;\n  color: var(--muted);\n  background: var(--panel);\n  border: 1px solid var(--line);\n  border-radius: 999px;\n  padding: 2px 9px;\n}\n\n/* ---- avatars ---- */\n.sv-root .avatar-wrap {\n  position: relative;\n  flex: none;\n  display: inline-flex;\n}\n.sv-root .avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n  background: var(--panel-2);\n}\n.sv-root .avatar.sm {\n  width: 30px;\n  height: 30px;\n}\n.sv-root .avatar.xs {\n  width: 28px;\n  height: 28px;\n}\n.sv-root .level-badge {\n  position: absolute;\n  bottom: -3px;\n  right: -4px;\n  min-width: 14px;\n  height: 14px;\n  padding: 0 3px;\n  box-sizing: border-box;\n  border-radius: 999px;\n  background: #1d6ce0;\n  color: #fff;\n  font-size: 9px;\n  font-weight: 700;\n  line-height: 14px;\n  text-align: center;\n  pointer-events: none;\n}\n.sv-root .level-badge[hidden] {\n  display: none;\n}\n\n/* ---- zoekterm markering ---- */\n.sv-root mark.sv-hl {\n  background: #e9b84a;\n  color: #000;\n  border-radius: 2px;\n  padding: 0 1px;\n}\n.sv-root[data-theme="minimax"] mark.sv-hl {\n  background: #fde68a;\n}\n\n/* ---- infinite-scroll sentinel ---- */\n.sv-root .sentinel {\n  text-align: center;\n  color: var(--muted);\n  font-size: 12px;\n  padding: 14px;\n  visibility: hidden;\n}\n.sv-root .sentinel.show {\n  visibility: visible;\n}\n\n/* ---- detail pane (§6 step 4a — selected post; comments shell) ---- */\n.sv-root .detail {\n  flex: 1;\n  overflow-y: auto;\n  padding: 28px 32px 80px;\n}\n.sv-root .placeholder {\n  color: var(--muted);\n  margin-top: 12vh;\n  text-align: center;\n  font-size: 15px;\n}\n.sv-root .dwrap {\n  max-width: 680px;\n  margin: 0 auto;\n  background: var(--panel);\n  border: 1px solid var(--line);\n  border-radius: 12px;\n  padding: 20px 24px 0;\n}\n.sv-root .pmeta {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n.sv-root .who {\n  font-weight: 600;\n  font-size: 14px;\n}\n.sv-root .when {\n  color: var(--muted);\n  font-size: 12px;\n}\n.sv-root .detail h1 {\n  font-size: 22px;\n  margin: 6px 0 10px;\n  letter-spacing: -0.01em;\n  text-wrap: pretty;\n}\n.sv-root .dcat {\n  margin: 0 0 16px;\n}\n.sv-root .dbody {\n  color: var(--bodytext);\n  white-space: pre-wrap;\n  margin: 0 0 16px;\n  word-break: break-word;\n}\n.sv-root .dbody a {\n  color: var(--accent);\n  text-decoration: none;\n}\n.sv-root .dbody a:hover {\n  text-decoration: underline;\n}\n\n/* ---- attachments (thumbnails + lightbox; posts + comments) ---- */\n.sv-root .attach {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin: 0 0 16px;\n}\n.sv-root .cbody .attach {\n  margin: 6px 0 2px;\n}\n.sv-root .attach-thumb {\n  padding: 0;\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  background: var(--panel);\n  cursor: zoom-in;\n  overflow: hidden;\n  line-height: 0;\n}\n.sv-root .attach-thumb img {\n  display: block;\n  height: 160px;\n  width: auto;\n  max-width: 320px;\n  object-fit: cover;\n}\n.sv-root .attach.compact .attach-thumb img {\n  height: 108px;\n  max-width: 220px;\n}\n.sv-root .dfile {\n  display: inline-block;\n  padding: 6px 10px;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  color: var(--accent);\n  text-decoration: none;\n  font-size: 13px;\n}\n.sv-root .dfile:hover {\n  background: var(--panel);\n}\n\n/* ---- lightbox (zoomed attachment image) ---- */\n.sv-root .lightbox {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px;\n}\n.sv-root .lightbox-backdrop {\n  position: absolute;\n  inset: 0;\n  border: 0;\n  background: rgba(0, 0, 0, 0.82);\n  cursor: zoom-out;\n}\n.sv-root .lightbox-img {\n  position: relative;\n  max-width: 92vw;\n  max-height: 92vh;\n  border-radius: 8px;\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);\n}\n.sv-root .lightbox-close {\n  position: absolute;\n  top: 16px;\n  right: 20px;\n  width: 36px;\n  height: 36px;\n  border: 0;\n  border-radius: 999px;\n  background: rgba(0, 0, 0, 0.55);\n  color: #fff;\n  font-size: 22px;\n  line-height: 1;\n  cursor: pointer;\n}\n.sv-root .lightbox-close:hover {\n  background: rgba(0, 0, 0, 0.8);\n}\n\n/* ---- post action row (like / pin) — real state, inert until step 5 ---- */\n.sv-root .dactions {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.sv-root .act {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: var(--panel-2);\n  color: var(--muted);\n  border: 1px solid var(--line);\n  border-radius: 999px;\n  padding: 5px 12px;\n  font-size: 13px;\n}\n.sv-root .act.pin:not(.on) {\n  filter: grayscale(1);\n}\n.sv-root .act.pin.on {\n  color: var(--accent-2);\n  border-color: var(--accent-2);\n}\n/* Liked state for the post like button (live in step 5). */\n.sv-root .act.like.on {\n  color: var(--accent);\n  border-color: var(--accent);\n}\n.sv-root .act:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n/* Inline write error (like/comment/reply failure) — brief, muted-danger text. */\n.sv-root .acterr {\n  font-size: 12px;\n  color: var(--danger, #e5534b);\n  align-self: center;\n}\n.sv-root .ic-thumb {\n  width: 14px;\n  height: 14px;\n  flex: none;\n}\n\n/* ---- comments section (shell only — list + fetch is step 4b) ---- */\n.sv-root .comments {\n  margin-top: 20px;\n  margin-left: -24px;\n  margin-right: -24px;\n  padding: 16px 24px 20px;\n  border-top: 1px solid var(--line);\n}\n.sv-root .chead-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 14px;\n}\n.sv-root .chead-row h3 {\n  font-size: 14px;\n  color: var(--muted);\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n}\n.sv-root .seg {\n  display: flex;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  overflow: hidden;\n}\n.sv-root .seg button {\n  background: var(--panel);\n  color: var(--muted);\n  border: 0;\n  padding: 5px 12px;\n  font-size: 12px;\n  font-weight: 600;\n  transition: background 0.1s ease, color 0.12s ease;\n}\n.sv-root .seg button:not(.on):hover {\n  background: color-mix(in oklab, var(--panel-2), transparent 45%);\n  color: var(--text);\n}\n.sv-root .seg button.on {\n  background: var(--panel-2);\n  color: var(--text);\n}\n.sv-root .composer {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 18px;\n}\n.sv-root .composer textarea {\n  flex: 1;\n  resize: vertical;\n  min-height: 56px;\n  background: var(--panel);\n  color: var(--text);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  padding: 10px 12px;\n  font: inherit;\n}\n.sv-root .composer textarea:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.sv-root .composer textarea:focus-visible {\n  outline: none;\n  border-color: var(--accent);\n  box-shadow: 0 0 0 2px color-mix(in oklab, var(--accent), transparent 70%);\n}\n.sv-root .composer .btn {\n  align-self: stretch;\n}\n.sv-root .cempty {\n  color: var(--muted);\n  font-size: 13px;\n  padding: 4px 0 2px;\n}\n.sv-root .cmore {\n  display: block;\n  width: 100%;\n  margin: 10px 0 4px;\n}\n\n/* ---- comment list (step 4b) ---- */\n.sv-root .comment {\n  display: flex;\n  gap: 10px;\n  margin: 0 0 8px;\n  padding: 12px;\n  background: var(--panel);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  transition: background 0.1s ease, border-color 0.12s ease;\n}\n.sv-root .comment:hover {\n  background: var(--panel-2);\n  border-color: var(--accent);\n}\n.sv-root .comment.reply {\n  margin-left: 24px;\n}\n/* Brief highlight when a notification jumps to this comment. */\n.sv-root .comment.cflash {\n  animation: sv-cflash 2s ease;\n}\n@keyframes sv-cflash {\n  0%,\n  30% {\n    background: color-mix(in oklab, var(--accent), transparent 72%);\n  }\n  100% {\n    background: transparent;\n  }\n}\n.sv-root .replies {\n  display: block;\n}\n.sv-root .cbody {\n  min-width: 0;\n  flex: 1;\n}\n.sv-root .crow {\n  display: flex;\n  gap: 8px;\n  align-items: baseline;\n}\n.sv-root .ctime {\n  color: var(--muted);\n  font-size: 12px;\n}\n.sv-root .ctext {\n  margin: 3px 0 4px;\n  color: var(--bodytext);\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.sv-root .ctext a {\n  color: var(--accent);\n}\n.sv-root .cactions {\n  display: flex;\n  gap: 14px;\n  align-items: center;\n  font-size: 12px;\n  color: var(--muted);\n}\n/* Comment like — a LIVE button (a comment IS a post, so it votes like one). */\n.sv-root .cactions .clike {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  background: none;\n  border: 0;\n  padding: 0;\n  color: var(--muted);\n  font: inherit;\n  cursor: pointer;\n  transition: color 0.1s ease;\n}\n.sv-root .cactions .clike:hover:not(:disabled) {\n  color: var(--text);\n}\n.sv-root .cactions .clike.on {\n  color: var(--accent);\n}\n.sv-root .cactions .clike:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.sv-root .replybtn {\n  background: none;\n  border: 0;\n  color: var(--accent);\n  font-size: 12px;\n  font-weight: 600;\n  padding: 0;\n  cursor: pointer;\n  transition: color 0.1s ease;\n}\n.sv-root .replybtn:hover {\n  color: var(--accent-hover);\n  text-decoration: underline;\n}\n.sv-root .replybox {\n  display: flex;\n  gap: 8px;\n  margin: 8px 0 4px;\n}\n.sv-root .replybox textarea {\n  flex: 1;\n  resize: vertical;\n  min-height: 40px;\n  background: var(--panel);\n  color: var(--text);\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 8px 10px;\n  font: inherit;\n  font-size: 14px;\n}\n.sv-root .replybox textarea:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.sv-root .replybox .btn.sm {\n  margin-top: 0;\n  align-self: center;\n}\n\n/* ---- screen-reader-only label (composer) ---- */\n.sv-root .sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n/* ---- buttons ---- */\n.sv-root .btn {\n  background: var(--accent);\n  color: var(--btn-fg);\n  border: 0;\n  border-radius: 10px;\n  padding: 0 16px;\n  font-weight: 700;\n  transition: background 0.1s ease;\n}\n.sv-root .btn:hover:not(:disabled) {\n  background: var(--accent-hover);\n}\n.sv-root .btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.sv-root .btn.sm {\n  padding: 6px 12px;\n  font-size: 13px;\n  margin-top: 10px;\n}\n\n/* ---- mentions (step 5c): rendered @mention + composer autocomplete ---- */\n.sv-root .sv-mention {\n  color: var(--accent);\n  font-weight: 600;\n  text-decoration: none;\n}\n.sv-root a.sv-mention:hover {\n  text-decoration: underline;\n}\n\n/* MentionBox wraps the composer textarea so the dropdown can anchor to it. */\n.sv-root .mb {\n  position: relative;\n  flex: 1;\n  min-width: 0;\n}\n.sv-root .mb textarea {\n  width: 100%;\n  box-sizing: border-box;\n}\n.sv-root .mb-list {\n  position: absolute;\n  z-index: 10;\n  left: 0;\n  right: 0;\n  top: calc(100% + 4px);\n  padding: 4px;\n  max-height: 240px;\n  overflow-y: auto;\n  background: var(--panel-2);\n  border: 1px solid var(--line);\n  border-radius: 10px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);\n}\n.sv-root .mb-empty {\n  padding: 8px 10px;\n  color: var(--muted);\n  font-size: 13px;\n}\n.sv-root .mb-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  text-align: left;\n  background: none;\n  border: 0;\n  border-radius: 8px;\n  padding: 6px 8px;\n  color: var(--text);\n  cursor: pointer;\n  font: inherit;\n}\n.sv-root .mb-item:hover,\n.sv-root .mb-item.active {\n  background: color-mix(in oklab, var(--accent), transparent 82%);\n}\n.sv-root .mb-name {\n  font-size: 14px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.sv-root .mb-handle {\n  color: var(--muted);\n  font-size: 12px;\n  margin-left: auto;\n  white-space: nowrap;\n}\n\n/* ---- narrow fallback ---- */\n@media (max-width: 860px) {\n  .sv-root .layout {\n    flex-direction: column;\n  }\n  .sv-root .listpane {\n    width: auto;\n    max-height: 42vh;\n    border-right: 0;\n    border-bottom: 1px solid var(--line);\n  }\n  .sv-root .detail {\n    padding: 20px;\n  }\n}\n@media (max-width: 640px) {\n  .sv-root .topbar {\n    gap: 12px;\n    padding: 0 12px 0 16px;\n  }\n  .sv-root .tabs button {\n    padding: 8px 10px;\n  }\n}\n\n/* ---- search bar ---- */\n.sv-root .search-wrap {\n  position: relative;\n  display: flex;\n  align-items: center;\n  order: -1;\n  width: 80%;\n  margin: 0 auto 4px;\n}\n.sv-root .search-input {\n  width: 100%;\n  padding: 6px 28px 6px 10px;\n  background: var(--panel);\n  border: 1px solid var(--line);\n  border-radius: 6px;\n  color: var(--text);\n  font: 13px/1.4 var(--font);\n  outline: none;\n  transition: border-color 0.1s;\n}\n.sv-root .search-input::placeholder {\n  color: var(--muted);\n}\n.sv-root .search-input:focus {\n  border-color: var(--accent);\n}\n.sv-root .search-input::-webkit-search-cancel-button {\n  display: none;\n}\n.sv-root .search-clear {\n  position: absolute;\n  right: 6px;\n  background: none;\n  border: none;\n  color: var(--muted);\n  font-size: 16px;\n  line-height: 1;\n  padding: 0 2px;\n  cursor: pointer;\n}\n.sv-root .search-clear:hover {\n  color: var(--text);\n}\n\n/* ---- resize handle (sleepbaar scheidingsstreepje) ---- */\n.sv-root .resize-handle {\n  width: 5px;\n  flex: none;\n  cursor: col-resize;\n  background: var(--line);\n  transition: background 0.1s;\n  position: relative;\n  z-index: 1;\n}\n.sv-root .resize-handle:hover,\n.sv-root .resize-handle:active {\n  background: var(--accent);\n}\n\n\n/* ---- pinned header: opvouwbaar + sorteerknop ---- */\n.sv-root .listdiv.pinned-header {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 16px;\n}\n.sv-root .pinned-toggle {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  flex: 1;\n  background: none;\n  border: none;\n  color: var(--muted);\n  font: inherit;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  cursor: pointer;\n  padding: 0;\n  text-align: left;\n}\n.sv-root .pinned-toggle:hover {\n  color: var(--text);\n}\n.sv-root .pinned-chevron {\n  display: inline-block;\n  transition: transform 0.3s;\n  font-size: 13px;\n}\n.sv-root .pinned-chevron.collapsed {\n  transform: rotate(-90deg);\n}\n.sv-root .pinned-sort-sel {\n  background: var(--panel);\n  color: var(--text);\n  border: 1px solid var(--line);\n  border-radius: 6px;\n  padding: 2px 6px;\n  font-size: 11px;\n  cursor: pointer;\n}\n\n/* ---- download-knop in de actie-rij ---- */\n.sv-root .act.dl-btn {\n  color: var(--accent);\n  border-color: var(--accent);\n  cursor: pointer;\n  font-size: 13px;\n}\n.sv-root .act.dl-btn:hover:not(:disabled) {\n  background: color-mix(in oklab, var(--accent), transparent 85%);\n}\n.sv-root .act.dl-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n/* ---- zoom-regeling in de topbar (verborgen — floating widget vervangt dit) ---- */\n.sv-root .zoom-controls {\n  display: none;\n  align-items: center;\n  gap: 2px;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 2px 4px;\n}\n.sv-root .zoom-btn {\n  width: 24px;\n  height: 24px;\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 1;\n}\n.sv-root .zoom-label {\n  font-size: 12px;\n  color: var(--muted);\n  min-width: 34px;\n  text-align: center;\n}\n\n';
  const activeSearchQuery = /* @__PURE__ */ state("");
  const memberLevelMap = /* @__PURE__ */ state(/* @__PURE__ */ new Map());
  const LEVEL_KEYS = new Set(["level", "currentlevel", "memberlevel", "skoolLevel", "grouplevel", "userlevel", "rank", "tier", "xp", "experience", "points"]);
  const LEVEL_SUB_KEYS = ["metadata", "profile", "membership", "groupMembership", "communityMembership", "memberProfile", "communityProfile"];
  function extractLevels(obj, map, depth) {
    if (!obj || typeof obj !== "object" || depth <= 0) return;
    if (Array.isArray(obj)) { for (const item of obj) extractLevels(item, map, depth - 1); return; }
    const keys = Object.keys(obj);
    if (obj.spData && typeof obj.spData === "string") {
      try { extractLevels(JSON.parse(obj.spData), map, depth); } catch {}
    }
    const hasName = keys.some((k) => ["firstName", "first_name", "name", "displayName"].includes(k));
    if (hasName) {
      let levelVal = NaN;
      // 1. Check flat keys on same object
      const lk = keys.find((k) => LEVEL_KEYS.has(k.toLowerCase()) || k.toLowerCase().includes("level"));
      if (lk) levelVal = Number(obj[lk]);
      // 2. If not found, check common sub-objects (metadata, profile, membership, etc.)
      if (!(levelVal > 0 && levelVal < 10000)) {
        for (const sub of LEVEL_SUB_KEYS) {
          const subObj = obj[sub];
          if (subObj && typeof subObj === "object" && !Array.isArray(subObj)) {
            // Check for Skool's packed sp_data / spData JSON string (contains lv = level)
            const spRaw = typeof subObj.sp_data === "string" ? subObj.sp_data
              : typeof subObj.spData === "string" ? subObj.spData : null;
            if (spRaw) {
              try {
                const spd = JSON.parse(spRaw);
                if (spd && typeof spd.lv === "number" && spd.lv > 0) { levelVal = spd.lv; break; }
              } catch {}
            }
            const subKeys = Object.keys(subObj);
            const slk = subKeys.find((k) => LEVEL_KEYS.has(k.toLowerCase()) || k.toLowerCase().includes("level"));
            if (slk) { levelVal = Number(subObj[slk]); break; }
          }
        }
      }
      if (levelVal > 0 && levelVal < 10000) {
        const fn2 = String(obj.firstName || obj.first_name || "");
        const ln2 = String(obj.lastName || obj.last_name || "");
        const nm = `${fn2} ${ln2}`.trim() || String(obj.name || obj.displayName || "");
        if (nm) map.set(nm.toLowerCase(), levelVal);
      }
    }
    for (const v of Object.values(obj)) { if (v && typeof v === "object") extractLevels(v, map, depth - 1); }
  }
  async function loadMemberLevels(buildId2, slug2, groupId2) {
    const map = get(memberLevelMap);
    const htmlPages = [
      `${BASE}/${slug2}/leaderboard`,
      `${BASE}/${slug2}/-/leaderboard`,
      `${BASE}/${slug2}/-/leaderboards`,
      `${BASE}/${slug2}/members`,
      `${BASE}/${slug2}/-/members`
    ];
    for (const pageUrl of htmlPages) {
      try {
        const res = await fetch(pageUrl, { credentials: "include", headers: { accept: "text/html" } });
        if (!res.ok) continue;
        const html2 = await res.text();
        const ndMatch = /<script[^>]+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html2);
        if (ndMatch) {
          const nd = JSON.parse(ndMatch[1]);
          extractLevels(nd?.props ?? nd, map, 12);
          if (map.size > 0) { set(memberLevelMap, map, true); return; }
        }
      } catch {}
    }
    if (groupId2) {
      const apiUrls = [
        `${API2_BASE}/groups/${groupId2}/leaderboard?limit=200`,
        `${API2_BASE}/groups/${groupId2}/members?limit=200`,
        `${API2_BASE}/groups/${slug2}/leaderboard?limit=200`,
        `${API2_BASE}/groups/${slug2}/members?limit=200`
      ];
      for (const url of apiUrls) {
        try {
          const wt = await getWafToken();
          const res = await fetch(url, {
            credentials: "include",
            headers: { accept: "application/json", ...(wt ? { "x-aws-waf-token": wt } : {}) }
          });
          if (!res.ok) continue;
          extractLevels(await res.json(), map, 10);
          if (map.size > 0) { set(memberLevelMap, map, true); return; }
        } catch {}
      }
    }
    const jsonUrls = [
      `${BASE}/_next/data/${buildId2}/${slug2}/leaderboard.json?group=${slug2}`,
      `${BASE}/_next/data/${buildId2}/${slug2}/-/leaderboard.json?group=${slug2}`,
      `${BASE}/_next/data/${buildId2}/${slug2}/-/leaderboards.json?group=${slug2}`,
      `${BASE}/_next/data/${buildId2}/${slug2}/members.json?group=${slug2}`,
      `${BASE}/_next/data/${buildId2}/${slug2}/-/members.json?group=${slug2}`
    ];
    for (const url of jsonUrls) {
      try {
        const res = await fetch(url, { credentials: "include", headers: { accept: "application/json" } });
        if (!res.ok) continue;
        extractLevels(await res.json(), map, 10);
        if (map.size > 0) { set(memberLevelMap, map, true); break; }
      } catch {}
    }
    console.info(`[skool-view] levels: ${map.size} entries loaded (groupId=${groupId2 || "none"})`);
  }
  function ingestFeedLevels(pageProps) {
    const map = get(memberLevelMap);
    const before = map.size;
    extractLevels(pageProps, map, 12);
    if (map.size > before) set(memberLevelMap, map, true);
  }
  // Koppelvariabele: App registreert changeZoom hier zodat mountOverlay het kan gebruiken
  let _changeZoom = null;
  const HOST_ID = "skool-view-host";
  let hostElement = null;
  let shadowRoot = null;
  let appInstance = null;
  let bodyObserver = null;
  let zoomFloat = null;
  let _fullscreenHandler = null;
  let overlayOn = false;
  function mountOverlay() {
    if (hostElement) return;
    hostElement = document.createElement("div");
    hostElement.id = HOST_ID;
    hostElement.style.position = "fixed";
    hostElement.style.inset = "0";
    hostElement.style.zIndex = "2147483647";
    shadowRoot = hostElement.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = overlayCss;
    shadowRoot.appendChild(style);
    const appRoot = document.createElement("div");
    shadowRoot.appendChild(appRoot);
    document.body.appendChild(hostElement);
    appInstance = mount(App, {
      target: appRoot,
      props: { onClose: requestToggleOff },
    });
    observeBody();
    // Floating zoom-widget — buiten hostElement zodat hij niet meezoomt
    zoomFloat = document.createElement("div");
    zoomFloat.id = "sv-zoom-float";
    zoomFloat.style.cssText = "position:fixed;bottom:16px;right:32px;z-index:2147483648;display:flex;flex-direction:column;align-items:center;padding:4px 0;background:#fff;border:1px solid #d0d0d0;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.2);overflow:visible;user-select:none;font-family:system-ui,sans-serif;";
    // Percentage tooltip — verschijnt kort naast de widget bij klikken
    const zoomLabelEl = document.createElement("span");
    zoomLabelEl.id = "sv-zoom-float-label";
    zoomLabelEl.style.cssText = "position:absolute;right:44px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.75);color:#fff;font-size:12px;padding:3px 8px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.15s;";
    zoomLabelEl.textContent = (Number(localStorage.getItem("sv-zoom")) || 100) + "%";
    zoomFloat.appendChild(zoomLabelEl);
    const showZoomLabel = () => {
      zoomLabelEl.style.opacity = "1";
      clearTimeout(_zoomLabelTimer);
      _zoomLabelTimer = setTimeout(() => { zoomLabelEl.style.opacity = "0"; }, 1500);
    };
    const mkDivider = () => { const d = document.createElement("div"); d.style.cssText = "width:24px;height:1px;background:#d0d0d0;flex:none;"; return d; };
    const mkZoomBtn = (label, delta) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.style.cssText = "background:none;border:none;color:#333;font-size:18px;font-weight:400;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;line-height:1;flex:none;";
      btn.addEventListener("mouseenter", () => { btn.style.background = "#f0f0f0"; });
      btn.addEventListener("mouseleave", () => { btn.style.background = "none"; });
      btn.addEventListener("click", () => { _changeZoom && _changeZoom(delta); showZoomLabel(); });
      return btn;
    };
    // Fullscreen-knop (SVG-icoontje — wisselt tussen expand en compress)
    const IC_EXPAND = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`;
    const IC_COMPRESS = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/></svg>`;
    const mkFullscreenBtn = () => {
      const btn = document.createElement("button");
      btn.title = "Volledig scherm";
      btn.style.cssText = "background:none;border:none;color:#333;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;flex:none;";
      btn.innerHTML = IC_EXPAND;
      btn.addEventListener("mouseenter", () => { btn.style.background = "#f0f0f0"; });
      btn.addEventListener("mouseleave", () => { btn.style.background = "none"; });
      btn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
      _fullscreenHandler = () => {
        btn.innerHTML = document.fullscreenElement ? IC_COMPRESS : IC_EXPAND;
        btn.title = document.fullscreenElement ? "Volledig scherm sluiten" : "Volledig scherm";
      };
      document.addEventListener("fullscreenchange", _fullscreenHandler);
      return btn;
    };
    zoomFloat.appendChild(mkZoomBtn("+", 10));
    zoomFloat.appendChild(mkDivider());
    zoomFloat.appendChild(mkZoomBtn("−", -10));
    zoomFloat.appendChild(mkDivider());
    zoomFloat.appendChild(mkFullscreenBtn());
    document.body.appendChild(zoomFloat);
  }
  function unmountOverlay() {
    stopObservingBody();
    if (appInstance) {
      unmount(appInstance);
      appInstance = null;
    }
    if (hostElement != null ? hostElement.parentNode : void 0) {
      hostElement.parentNode.removeChild(hostElement);
    }
    hostElement = null;
    shadowRoot = null;
    if (zoomFloat && zoomFloat.parentNode) {
      zoomFloat.parentNode.removeChild(zoomFloat);
    }
    zoomFloat = null;
    if (_fullscreenHandler) {
      document.removeEventListener("fullscreenchange", _fullscreenHandler);
      _fullscreenHandler = null;
    }
    if (_listpaneScrollEl && _listpaneScrollHandler) {
      _listpaneScrollEl.removeEventListener("scroll", _listpaneScrollHandler);
      _listpaneScrollEl = null;
      _listpaneScrollHandler = null;
    }
    if (_abortActiveCrawl) { _abortActiveCrawl(); _abortActiveCrawl = null; }
    clearTimeout(_zoomLabelTimer);
    _zoomLabelTimer = null;
    _changeZoom = null;
    _onFeedProgress = null;
    _onFeedReady = null;
  }
  function observeBody() {
    if (bodyObserver) return;
    bodyObserver = new MutationObserver(() => {
      if (overlayOn && hostElement && !document.body.contains(hostElement)) {
        document.body.appendChild(hostElement);
      }
    });
    bodyObserver.observe(document.body, { childList: true });
  }
  function stopObservingBody() {
    if (bodyObserver) {
      bodyObserver.disconnect();
      bodyObserver = null;
    }
  }
  function setOverlay(on) {
    overlayOn = on;
    document.documentElement.style.overflow = on ? "hidden" : "";
    if (on) mountOverlay();
    else unmountOverlay();
  }
  function requestToggleOff() {
    void browser.runtime.sendMessage({ type: "skool-view:request-toggle" });
  }
  browser.runtime.onMessage.addListener((message) => {
    const msg = message;
    if (msg?.type === "skool-view:set-overlay") {
      setOverlay(msg.on === true);
    }
    return void 0;
  });
  async function restoreInitialState() {
    try {
      const reply = await browser.runtime.sendMessage({ type: "skool-view:get-overlay" });
      if (reply?.on === true) {
        // Tab was refreshed while overlay was on — reset background state to off.
        void browser.runtime.sendMessage({ type: "skool-view:request-toggle" });
      }
    } catch {}
    setOverlay(false);
  }
  void restoreInitialState();
  window.addEventListener("popstate", () => {
    if (overlayOn) { setOverlay(false); requestToggleOff(); }
  });
  document.addEventListener("keydown", (e) => {
    if (overlayOn && e.key === "Escape" && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
      setOverlay(false); requestToggleOff();
    }
  }, true);
})();
