const fs = require('fs');
const path = require('path');

const itemType = {
    box: 'box',
    model: 'model',
    text: 'text',
    img: 'img',
};

const db = [
    {
        name: '',
        markerValue: '',
        itemType: itemType.model,
        modelSrc: '',
        rotation: '',
        position: '',
        color: '',
    },
];

const layoutTemplate = fs.readFileSync(
    path.join(__dirname, 'layout.html'),
    'utf8'
);

const buildPage = (model) => {
    let content = '';

    switch (model.itemType) {
        case itemType.box:
            content = `
            <a-marker type='barcode' value='${model.markerValue}'>
                <a-box position='${model.position ||
                    ''}' rotation="${model.rotation ||
                ''}" material='color: ${model.color ||
                'yellow'}; opacity: 0.5'></a-box>
            </a-marker>`;
            break;
        case itemType.model:
            content = `
            <a-assets>
                <a-asset-item id="${model.name}" src="${
                model.modelSrc
            }"></a-asset-item>
            </a-assets>
            <a-marker type='barcode' value='${model.markerValue}'>
                <a-entity gltf-model="#${
                    model.name
                }" rotation="${model.rotation ||
                ''}" position="${model.position ||
                ''}" modify-materials></a-entity>
            </a-marker>`;
            break;
    }

    fs.writeFileSync(
        path.join(__dirname, '..', `${model.name}.html`),
        layoutTemplate.replace('{{content}}', content),
        (err) => {
            if (err) {
                console.error(`beda ${model.name}`);
                console.log(model);
            }
            console.log(`win ${model.name}`);
        }
    );
};

for (let i = 0; i <= 63; i++) {
    const colors = ['red', 'green', 'blue'];
    buildPage({
        name: i,
        markerValue: i,
        itemType: itemType.box,
        color: colors[Math.floor(Math.random() * colors.length)],
    });
}
