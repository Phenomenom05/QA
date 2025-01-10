const assert = require('assert');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8080';









describe('Profile Creation Feature', () => {
    beforeEach(async () => {
        await browser.url(BASE_URL);
        await browser.setTimeout({ implicit: 5000 });
    });

    it('should successfully create a profile', async () => {
        await $('#username').setValue('John Doe');
        await $('#age').setValue('30');
        await $('#gender').selectByVisibleText('Male');
        await $('#location').setValue('Lagos');
        await $('#interests').setValue('Hiking, Music');

        const uploadButton = await $('#profilePicture');
        const filePath = process.env.IMAGE_PATH';
        const remoteFilePath = await browser.uploadFile(filePath);
        await uploadButton.setValue(remoteFilePath);

        await $('#submit').click();

        const successMessage = await $('#success-message').getText();
        assert.strictEqual(successMessage.trim(), 'Profile created successfully!');
    });

    it('should display error for invalid image upload', async () => {
        await $('#username').setValue('Jane Doe');
        await $('#age').setValue('28');
        await $('#gender').selectByVisibleText('Female');
        await $('#location').setValue('Abuja');
        await $('#interests').setValue('Photography, Traveling');

        const uploadButton = await $('#profilePicture');
        const invalidFilePath = 'C:\\Users\\pheda\\Downloads\\invalid_file.txt';
        const fs = require('fs');
        if (!fs.existsSync(invalidFilePath)) {
            fs.writeFileSync(invalidFilePath, 'This is not an image file.');
        }
        const remoteFilePath = await browser.uploadFile(invalidFilePath);
        await uploadButton.setValue(remoteFilePath);

        await $('#submit').click();

        const errorMessage = await $('#error-message').getText();
        assert.strictEqual(errorMessage.trim(), 'Invalid file format!');
    });
});


describe('Profile Creation Feature - Missing Fields', () => {
    beforeEach(async () => {
        await browser.url(BASE_URL);
        await browser.setTimeout({ implicit: 5000 });
    });

    it('should display error for missing mandatory fields', async () => {
//        await browser.execute(() => {
//            document.querySelectorAll('input, select, textarea').forEach((el) => {
//                if (el.type === 'text' || el.tagName === 'TEXTAREA') {
//                    el.value = '';
//                } else if (el.tagName === 'SELECT') {
//                    el.selectedIndex = 0;
//                }
//            });
//        });

        await $('#submit').click();

        const errorMessage = await $('#error-message').getText();
        const expectedMessage = 'Please fill out all mandatory fields.';
        assert.strictEqual(expectedMessage.trim(), errorMessage.trim(), 'Error message does not match');


    });
});




