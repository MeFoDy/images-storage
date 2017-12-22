export default {
    data() {
        return {
            images: [],
            headers: [
                {
                    text: 'Preview',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {
                    text: 'Name',
                    value: 'name',
                },
                {
                    text: 'Links',
                    value: 'links',
                },
                {
                    text: 'Uploaded at',
                    value: 'uploadedAt',
                },
            ],
        };
    },
};
