import * as mockApi from "./mockApi.js";
import { API_ENV, request, shouldUseMockApi } from "./httpClient.js";

const USER_ID = "W001";

function mockOrHttp(mockCall, httpCall) {
  return shouldUseMockApi() ? mockCall() : httpCall();
}

export function getApiMode() {
  return shouldUseMockApi() ? "mock" : API_ENV;
}

export function getToday({ locale, support, checkin }) {
  return mockOrHttp(
    () => mockApi.getToday({ locale, support, checkin }),
    () => request(`/api/v1/participants/${USER_ID}/today`, { locale })
  );
}

export function getTodayActions({ locale, support, completed }) {
  return mockOrHttp(
    () => mockApi.getTodayActions({ locale, support, completed }),
    () => request(`/api/v1/participants/${USER_ID}/actions/today`, { locale })
  );
}

export function createCheckin({ locale, payload }) {
  return mockOrHttp(
    () => mockApi.createCheckin({ payload }),
    () => request(`/api/v1/participants/${USER_ID}/symptom-checkins`, { method: "POST", locale, body: payload, platform: "mobile-web" })
  );
}

export function completeAction({ locale, assignmentId }) {
  return mockOrHttp(
    () => mockApi.completeAction({ assignmentId }),
    () => request(`/api/v1/participants/${USER_ID}/actions/${assignmentId}/complete`, { method: "POST", locale, body: { status: "completed" }, platform: "mobile-web" })
  );
}

export function listFollowups({ locale, support, alerts, completed, statuses }) {
  return mockOrHttp(
    () => mockApi.listFollowups({ locale, support, alerts, completed, statuses }),
    () => request("/api/v1/care-team/followups", { locale })
  );
}

export function updateFollowup({ locale, followupId, status }) {
  return mockOrHttp(
    () => mockApi.updateFollowup({ followupId, status }),
    () => request(`/api/v1/care-team/followups/${followupId}`, { method: "PATCH", locale, body: { status } })
  );
}

export function getCaseDetail({ locale, support, alerts, completed }) {
  return mockOrHttp(
    () => mockApi.getCaseDetail({ locale, support, alerts, completed }),
    () => request("/api/v1/care-team/cases/MENO-HK-001", { locale })
  );
}

export function getIntegrationOverview({ locale }) {
  return mockOrHttp(
    () => mockApi.getIntegrationOverview({ locale }),
    () => request("/api/v1/admin/integrations/overview", { locale })
  );
}
