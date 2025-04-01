const GITHUB_TOKEN = 'ghp_your_new_token'; // Token của bạn
const REPO_OWNER = 'Trantoan12022004';
const REPO_NAME = 'host_image_page_anhtonton';

export const uploadImageToGithub = async (file) => {
    try {
        // Chuyển file thành base64
        const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        // Tạo tên file unique
        const fileName = `image_${Date.now()}.${file.name.split('.').pop()}`;

        // Gọi API GitHub để upload
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/images/${fileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Upload image via API',
                content: base64Data
            })
        });

        if (!response.ok) {
            throw new Error('Failed to upload image to GitHub');
        }

        const data = await response.json();
        
        // Trả về URL raw của ảnh
        return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/images/${fileName}`;

    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};


export const testGithubToken = async (token) => {
    try {
        const response = await fetch('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            console.log('Token is valid and has correct permissions');
            return true;
        } else {
            const error = await response.json();
            console.error('Token permission error:', error);
            return false;
        }
    } catch (error) {
        console.error('Token test failed:', error);
        return false;
    }
};