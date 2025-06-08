// Navigation between pages
document.getElementById('login-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (name && email) {
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('profile-page').classList.add('active');
    } else {
        alert('Please enter your name and email');
    }
});

document.getElementById('profile-btn').addEventListener('click', function() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    
    if (age && gender && height && weight && activity && goal) {
        calculateRecommendations();
        document.getElementById('profile-page').classList.remove('active');
        document.getElementById('results-page').classList.add('active');
    } else {
        alert('Please fill in all the fields');
    }
});

document.getElementById('start-over-btn').addEventListener('click', function() {
    document.getElementById('results-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');
    
    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('activity').value = '';
    document.getElementById('goal').value = '';
});

// Calculate nutrition recommendations
function calculateRecommendations() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    
    // Display user profile summary
    const profileSummary = document.getElementById('profile-summary');
    profileSummary.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age} years</p>
        <p><strong>Gender:</strong> ${gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
        <p><strong>Height:</strong> ${height} cm</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>BMI:</strong> ${calculateBMI(height, weight).toFixed(1)}</p>
    `;
    
    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityFactors = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very_active': 1.9
    };
    
    const tdee = Math.round(bmr * activityFactors[activity]);
    
    // Adjust calories based on goal
    let calorieGoal;
    let proteinRatio, carbRatio, fatRatio;
    
    switch(goal) {
        case 'weight_loss':
            calorieGoal = Math.round(tdee * 0.8);
            proteinRatio = 0.3;
            carbRatio = 0.4;
            fatRatio = 0.3;
            break;
        case 'maintenance':
            calorieGoal = tdee;
            proteinRatio = 0.25;
            carbRatio = 0.5;
            fatRatio = 0.25;
            break;
        case 'weight_gain':
            calorieGoal = Math.round(tdee * 1.15);
            proteinRatio = 0.25;
            carbRatio = 0.5;
            fatRatio = 0.25;
            break;
        case 'muscle_gain':
            calorieGoal = Math.round(tdee * 1.1);
            proteinRatio = 0.35;
            carbRatio = 0.45;
            fatRatio = 0.2;
            break;
        case 'health':
            calorieGoal = tdee;
            proteinRatio = 0.25;
            carbRatio = 0.45;
            fatRatio = 0.3;
            break;
        default:
            calorieGoal = tdee;
            proteinRatio = 0.25;
            carbRatio = 0.5;
            fatRatio = 0.25;
    }
    
    // Calculate macronutrients in grams
    const proteinGrams = Math.round((calorieGoal * proteinRatio) / 4);
    const carbGrams = Math.round((calorieGoal * carbRatio) / 4);
    const fatGrams = Math.round((calorieGoal * fatRatio) / 9);
    
    // Display calorie and macro results
    document.getElementById('calories-result').innerHTML = `
        <p>Your daily calorie target: <strong>${calorieGoal} calories</strong></p>
    `;
    
    document.getElementById('macros-result').innerHTML = `
        <p><strong>Protein:</strong> ${proteinGrams}g (${Math.round(proteinRatio * 100)}%)</p>
        <p><strong>Carbohydrates:</strong> ${carbGrams}g (${Math.round(carbRatio * 100)}%)</p>
        <p><strong>Fats:</strong> ${fatGrams}g (${Math.round(fatRatio * 100)}%)</p>
    `;
    
    // Generate recommendations based on goal
    const recommendations = document.getElementById('recommendations');
    let recommendationText = '';
    
    switch(goal) {
        case 'weight_loss':
            recommendationText = `
                <p><strong>For Weight Loss:</strong></p>
                <ul>
                    <li>Eat more protein to stay full longer</li>
                    <li>Choose vegetables, beans, and whole grains</li>
                    <li>Include small amounts of healthy fats</li>
                    <li>Drink plenty of water</li>
                </ul>
                <p><strong>Good food choices:</strong> Chicken, fish, eggs, yogurt, vegetables, fruits, nuts</p>
            `;
            break;
            
        case 'maintenance':
            recommendationText = `
                <p><strong>For Maintaining Weight:</strong></p>
                <ul>
                    <li>Eat balanced meals with protein, carbs, and healthy fats</li>
                    <li>Focus on whole foods</li>
                    <li>Watch portion sizes</li>
                    <li>Stay active</li>
                </ul>
                <p><strong>Good food choices:</strong> Variety of meats, fish, eggs, dairy, fruits, vegetables, whole grains</p>
            `;
            break;
            
        case 'weight_gain':
            recommendationText = `
                <p><strong>For Weight Gain:</strong></p>
                <ul>
                    <li>Eat more often - aim for 5-6 meals/snacks daily</li>
                    <li>Choose calorie-dense healthy foods</li>
                    <li>Add extra healthy fats to meals</li>
                    <li>Try smoothies between meals</li>
                </ul>
                <p><strong>Good food choices:</strong> Fatty fish, whole eggs, full-fat dairy, nuts, nut butters, dried fruits</p>
            `;
            break;
            
        case 'muscle_gain':
            recommendationText = `
                <p><strong>For Muscle Gain:</strong></p>
                <ul>
                    <li>Eat more protein throughout the day</li>
                    <li>Eat carbs before and after workouts</li>
                    <li>Have protein within 30-60 minutes after exercise</li>
                    <li>Drink plenty of water</li>
                </ul>
                <p><strong>Good food choices:</strong> Chicken, lean beef, eggs, fish, rice, oats, sweet potatoes</p>
            `;
            break;
            
        case 'health':
            recommendationText = `
                <p><strong>For Better Health:</strong></p>
                <ul>
                    <li>Eat mostly whole, unprocessed foods</li>
                    <li>Aim for 5+ servings of vegetables and fruits daily</li>
                    <li>Choose a variety of colorful foods</li>
                    <li>Limit added sugar and processed foods</li>
                </ul>
                <p><strong>Good food choices:</strong> Vegetables, fruits, fish, eggs, nuts, beans, whole grains</p>
            `;
            break;
            
        default:
            recommendationText = `
                <p><strong>General Tips:</strong></p>
                <ul>
                    <li>Eat whole, nutrient-rich foods</li>
                    <li>Drink plenty of water</li>
                    <li>Include protein, carbs, and healthy fats in meals</li>
                    <li>Be consistent with your eating habits</li>
                </ul>
                <p><strong>Good food choices:</strong> Lean meats, fish, eggs, dairy, vegetables, fruits, whole grains, nuts</p>
            `;
    }
    
    recommendations.innerHTML = recommendationText;
}

function calculateBMI(height, weight) {
    // Convert height from cm to m
    const heightInMeters = height / 100;
    // BMI formula: weight (kg) / height² (m²)
    return weight / (heightInMeters * heightInMeters);
}