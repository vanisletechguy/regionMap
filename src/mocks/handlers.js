import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

// Mock handlers
export const handlers = [
  http.get('/api/region/:id', ({ params }) => {
    const { id } = params;

    const regions = {
      '1': {
        title: 'Canvassing Summary',
        voters: 1000,
        lastWeek: {
          doorsKnocked: 300,
          callsMade: 200,
          friendlyResponses: 150,
        },
        last30Days: {
          doorsKnocked: 1000,
          callsMade: 800,
          friendlyResponses: 600,
        },
        thisCampaign: {
          doorsKnocked: 2000,
          callsMade: 1500,
          friendlyResponses: 1000,
        },
      },
      '2': {
        title: 'Canvassing Summary',
        voters: 1200,
        lastWeek: {
          doorsKnocked: 400,
          callsMade: 250,
          friendlyResponses: 200,
        },
        last30Days: {
          doorsKnocked: 1200,
          callsMade: 900,
          friendlyResponses: 700,
        },
        thisCampaign: {
          doorsKnocked: 2500,
          callsMade: 1800,
          friendlyResponses: 1200,
        },
      },
      '3': {
        title: 'Canvassing Summary',
        voters: 1500,
        lastWeek: {
          doorsKnocked: 500,
          callsMade: 300,
          friendlyResponses: 250,
        },
        last30Days: {
          doorsKnocked: 1500,
          callsMade: 1000,
          friendlyResponses: 800,
        },
        thisCampaign: {
          doorsKnocked: 3000,
          callsMade: 2000,
          friendlyResponses: 1500,
        },
      },
    };

    return HttpResponse.json(regions[id]);
  }),
];

const worker = setupWorker(...handlers);
worker.start();

