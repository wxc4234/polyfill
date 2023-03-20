Element.prototype.closest = null;
require('./closet');

describe('Array.protype.includes', () => {
    beforeAll(() => {
        const fakeHTML = `
            <div class="div1">
                <div class="div1" id="child">
                    <div class="banner"></div>
                    <p></p>
                    <p id="p"><i class="i"></i></p>
                </div>
            </div>
        `;
        document.body.innerHTML = fakeHTML;
    });

    test('is function', () => {
        expect(typeof Element.prototype.closest === 'function').toBeTruthy();
    });

    test('case', () => {
        expect(document.querySelector('.banner').closest('.div1').id).toEqual('child');
        expect(document.querySelector('i').closest('p').id).toEqual('p');
    });

});
