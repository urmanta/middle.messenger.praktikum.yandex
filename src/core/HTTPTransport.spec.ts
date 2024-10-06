import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport, METHODS } from './HTTPTransport';

describe('HTTPTransport', () => {
    let xhr: sinon.SinonFakeXMLHttpRequestStatic;
    let requests: sinon.SinonFakeXMLHttpRequest[];
    let transport: HTTPTransport;

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = (req) => requests.push(req);
        transport = new HTTPTransport('/test');
    });

    afterEach(() => {
        xhr.restore();
    });

    it('should send a GET request', async () => {
        const responsePromise = transport.get('/resource');

        expect(requests).to.have.length(1);
        expect(requests[0].method).to.equal(METHODS.GET);
        expect(requests[0].url).to.equal('https://ya-praktikum.tech/api/v2/test/resource');

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));

        const response = await responsePromise;
        expect((response as XMLHttpRequest).status).to.equal(200);
    });

    it('should send a POST request', async () => {
        const responsePromise = transport.post('/resource', { data: { key: 'value' } });

        expect(requests).to.have.length(1);
        expect(requests[0].method).to.equal(METHODS.POST);
        expect(requests[0].requestBody).to.equal(JSON.stringify({ key: 'value' }));

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));

        const response = await responsePromise;
        expect((response as XMLHttpRequest).status).to.equal(200);
    });

    it('should send a PUT request with data', async () => {
        const responsePromise = transport.put('/resource', { data: { key: 'value' } });

        expect(requests).to.have.length(1);
        expect(requests[0].method).to.equal(METHODS.PUT);
        expect(requests[0].requestBody).to.equal(JSON.stringify({ key: 'value' }));

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));

        const response = await responsePromise;
        expect((response as XMLHttpRequest).status).to.equal(200);
    });

    it('should send a DELETE request', async () => {
        const responsePromise = transport.delete('/resource');

        expect(requests).to.have.length(1);
        expect(requests[0].method).to.equal(METHODS.DELETE);
        expect(requests[0].url).to.equal('https://ya-praktikum.tech/api/v2/test/resource');

        requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify({ success: true }));

        const response = await responsePromise;
        expect((response as XMLHttpRequest).status).to.equal(200);
    });

    it('should reject if no method is provided in request', async () => {
        try {
            await transport.request('https://ya-praktikum.tech/api/v2/test', { method: undefined as unknown as METHODS });
        } catch (error) {
            expect(error).to.equal('No method');
        }
    });
});
