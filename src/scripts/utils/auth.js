import common from "@/utils/common";

export function getToken() {
  return common.storageGet("token");
}

export function setToken(token) {
  return common.storageSet({token});
}

export function removeToken() {
  return common.storageRemove("token");
}

export function getLock() {
  return common.storageGet("lock");
}

export function setLock(lock) {
  return common.storageSet({lock});
}
export function removeLock() {
  return common.storageRemove("lock");
}
