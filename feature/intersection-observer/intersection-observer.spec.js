delete window.IntersectionObserver;
delete window.IntersectionObserverEntry;
const {IntersectionObserver} = require('./intersection-observer');

describe('Map', () => {
    test('callback must be a function', () => {
        expect(() => {
            new IntersectionObserver({});
        }).toThrow('callback must be a function');
    });
    test('invalid threshold', () => {
        expect(() => {
            new IntersectionObserver(jest.fn(), {threshold: 2});
        }).toThrow('threshold must be a number between 0 and 1 inclusively');
    });

    test('invalid root node', () => {
        const root = document.createComment('root');
        expect(() => {
            new IntersectionObserver(jest.fn(), {root});
        }).toThrow('root must be a Document or Element');
    });

    test('invalid rootMargin', () => {
        expect(() => {
            new IntersectionObserver(jest.fn(), {rootMargin: '.1rem'});
        }).toThrow('rootMargin must be specified in pixels or percent');
    });

    test('constructor', () => {
        const mockCallback = jest.fn();
        new IntersectionObserver(mockCallback);
    });

    test('observe using interval', () => {
        const spyOnSetInterval = jest.spyOn(window, 'setInterval');
        const spyOnClearInterval = jest.spyOn(window, 'clearInterval');
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);
        (observer).POLL_INTERVAL = 100;
        const target = document.createElement('div');
        observer.observe(target);
        expect(spyOnSetInterval.mock.calls[0][1]).toBe(100);
        observer.disconnect();
        expect(spyOnClearInterval).toHaveBeenCalled();
    });

    test('observe not using MutationObserver', () => {
        const originalMutationObserverConstructor = window.MutationObserver;
        const mockMutationObserverObserve = jest.fn();
        class MockMutationObserver {
            observe() {
                mockMutationObserverObserve();
            }
        }
        (window).MutationObserver = MockMutationObserver;
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);
        (observer).USE_MUTATION_OBSERVER = false;
        const target = document.createElement('div');
        observer.observe(target);
        expect(mockMutationObserverObserve).not.toHaveBeenCalled();
        // reset
        window.MutationObserver = originalMutationObserverConstructor;
    });

    test('observe invalid target', () => {
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);

        expect(() => {
            const mockInvalidTarget = document.createComment('target');
            observer.observe(mockInvalidTarget);
        }).toThrow('target must be an Element');

        const el = document.createElement('div');
        observer.observe(el);
    });

    test('observe', () => {
        const spyOnDocumentAddEventListener = jest.spyOn(document, 'addEventListener');
        const spyOnWindowAddEventListener = jest.spyOn(window, 'addEventListener');
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);
        const target = document.createElement('div');
        target.getBoundingClientRect = () => ({
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
            width: 100,
            height: 100,
        });
        document.body.appendChild(target);
        observer.observe(target);
        expect(spyOnDocumentAddEventListener.mock.calls[0][0]).toBe('scroll');
        expect(spyOnWindowAddEventListener.mock.calls[0][0]).toBe('resize');
    });

    test('unobserve', () => {
        const spyOnDocumentRemoveEventListener = jest.spyOn(document, 'removeEventListener');
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);
        const target = document.createElement('div');
        document.body.appendChild(target);
        const anotherTarget = document.createElement('div');
        document.body.appendChild(anotherTarget);
        // 停止监听一个未监听过的 target 啥都不会做
        observer.unobserve(target);
        expect(spyOnDocumentRemoveEventListener).not.toHaveBeenCalled();
        // observe
        observer.observe(target);
        observer.observe(anotherTarget);
        // 同一个 doc 还在监听 anotherTarget，不会被移除
        observer.unobserve(target);
        expect(spyOnDocumentRemoveEventListener).not.toHaveBeenCalled();
        // 移除 doc 上最后一个监听的 target，移除 doc 上的事件
        observer.unobserve(anotherTarget);
    });

    test('disconnect', () => {
        const spyOnDocumentRemoveEventListener = jest.spyOn(document, 'removeEventListener');
        const spyOnWindowRemoveEventListener = jest.spyOn(window, 'removeEventListener');
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);
        const el = document.createElement('div');
        observer.observe(el);
        observer.disconnect();
        expect(spyOnDocumentRemoveEventListener.mock.calls[0][0]).toBe('scroll');
        expect(spyOnWindowRemoveEventListener.mock.calls[0][0]).toBe('resize');
        spyOnDocumentRemoveEventListener.mockClear();
        // duplicate disconnect
        observer.disconnect();
        expect(spyOnDocumentRemoveEventListener).not.toHaveBeenCalled();
    });

    test('getBoundingClientRect', () => {
        const spyOnGetBoundingClientRect = jest.spyOn(Element.prototype, 'getBoundingClientRect');
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);
        const el = document.createElement('div');
        // get empty rect
        spyOnGetBoundingClientRect.mockReturnValueOnce(null);
        observer.observe(el);
        observer.unobserve(el);
        spyOnGetBoundingClientRect.mockClear();
        // simulate older ie
        spyOnGetBoundingClientRect.mockReturnValueOnce({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        });
        observer.observe(el);
        observer.unobserve(el);
        spyOnGetBoundingClientRect.mockClear();
    });

    test('get RootRect', () => {
        const spyOnGetBoundingClientRect = jest.spyOn(Element.prototype, 'getBoundingClientRect');
        const mockCallback = jest.fn();
        const root = document.createElement('div');
        const target = document.createElement('div');
        document.body.append(root);
        root.appendChild(target);
        const observer = new IntersectionObserver(mockCallback, {root});
        observer.observe(target);
    });

    test('cross threshold', () => {
        const root = document.createElement('div');
        const target = document.createElement('div');
        root.appendChild(target);
        document.body.appendChild(root);
        const mockRootGetBoundingClientRect = jest.fn();
        mockRootGetBoundingClientRect.mockReturnValue({
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
            width: 100,
            heigth: 100,
        });
        root.getBoundingClientRect = mockRootGetBoundingClientRect;
        const mockTargetGetBoundingClientRect = jest.fn();
        mockTargetGetBoundingClientRect.mockReturnValue({
            top: 90,
            bottom: 130,
            left: 0,
            right: 100,
            width: 100,
            height: 40,
        });
        target.getBoundingClientRect = mockTargetGetBoundingClientRect;
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback, {
            root,
            threshold: 0.5,
        });
        observer.observe(target);
        mockCallback.mockClear();
        // modify target rect
        mockTargetGetBoundingClientRect.mockReturnValue({
            top: 70,
            bottom: 110,
            left: 0,
            right: 100,
            width: 100,
            height: 40,
        });
        document.dispatchEvent(new Event('scroll'));
    });

    test('remove target', () => {
        const root = document.createElement('div');
        const target = document.createElement('div');
        root.appendChild(target);
        document.body.appendChild(root);
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback);
        observer.observe(target);
        // reset
        mockCallback.mockClear();
        // remove target
        root.removeChild(target);
        // trigger check for intersection
        document.dispatchEvent(new Event('scroll'));
    });

    test('target display is none', () => {
        const root = document.createElement('div');
        const target = document.createElement('div');
        target.style.display = 'none';
        root.appendChild(target);
        document.body.appendChild(root);
        const mockRootGetBoundingClientRect = jest.fn();
        mockRootGetBoundingClientRect.mockReturnValue({
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
            width: 100,
            heigth: 100,
        });
        root.getBoundingClientRect = mockRootGetBoundingClientRect;
        const mockTargetGetBoundingClientRect = jest.fn();
        mockTargetGetBoundingClientRect.mockReturnValue({
            top: 90,
            bottom: 130,
            left: 0,
            right: 100,
            width: 100,
            height: 40,
        });
        target.getBoundingClientRect = mockTargetGetBoundingClientRect;
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback, {root});
        observer.observe(target);
    });

    test('parent display is none', () => {
        const root = document.createElement('div');
        const target = document.createElement('div');
        root.style.display = 'none';
        root.appendChild(target);
        document.body.appendChild(root);
        const mockRootGetBoundingClientRect = jest.fn();
        mockRootGetBoundingClientRect.mockReturnValue({
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
            width: 100,
            heigth: 100,
        });
        root.getBoundingClientRect = mockRootGetBoundingClientRect;
        const mockTargetGetBoundingClientRect = jest.fn();
        mockTargetGetBoundingClientRect.mockReturnValue({
            top: 90,
            bottom: 130,
            left: 0,
            right: 100,
            width: 100,
            height: 40,
        });
        target.getBoundingClientRect = mockTargetGetBoundingClientRect;
        const mockCallback = jest.fn();
        const observer = new IntersectionObserver(mockCallback, {root});
        observer.observe(target);
    });

    test('duplicated observe target', () => {
        const cb = jest.fn();
        const observer = new IntersectionObserver(cb);
        const target = document.createElement('div');
        document.body.appendChild(target);
        observer.observe(target);
        // observe one more time
        observer.observe(target);
    });

    test('cross origin updater', () => {
        const cb = jest.fn();
        const observer = new IntersectionObserver(cb);
        const updater = IntersectionObserver._setupCrossOriginUpdater();
        // 重复 setup 返回同一实例
        const duplicatedUpdater = IntersectionObserver._setupCrossOriginUpdater();
        expect(duplicatedUpdater).toBe(updater);
        const mockBoundingClientRect = {
            top: 0,
            bottom: 120,
            left: 0,
            right: 100,
            height: 120,
            width: 100,
        };
        const mockIntersectionRect = {
            top: 0,
            bottom: 100,
            left: 0,
            right: 100,
            height: 100,
            width: 100,
        };
        const target = document.createElement('div');
        document.body.appendChild(target);
        observer.observe(target);
        updater(mockBoundingClientRect, mockIntersectionRect);
        // reset
        IntersectionObserver._resetCrossOriginUpdater();
        const newUpdater = IntersectionObserver._setupCrossOriginUpdater();
        expect(newUpdater).not.toBe(updater);
    });
});
