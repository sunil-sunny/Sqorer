/* eslint-disable quote-props */
export class SubscriptionConstants {


    public static premiumStudentPlan(): any {
        const premiumStudentPlan = {
            'planName': 'Practice plus',
            'cost': '200'
        };
        return premiumStudentPlan;
    }

    public static premiumTeacherPlan(): any {
        const premiumTeacherPlan = {
            'planName': 'Teach plus',
            'cost': '1000'
        };
        return premiumTeacherPlan;
    }

    public static premiumParentPlan(): any {
        const premiumParentPlan = {
            'planName': 'Parent plus',
            'cost': '500'
        };
        return premiumParentPlan;
    }
    public static freeStudentFeatures(): any[] {
        return [
            'Play self paced games',
            '5 game types',
            'View your reports'
        ];
    }

    public static premiumStudentFeatures(): any[] {
        return [
            'Everything is free, plus',
            'Create teams',
            'Schedules games',
            'Self paced games',
            'All game types',
            'Detailed analytics'
        ];
    }

    public static freeTeacherFeatures(): any[] {
        return [
            'Add students',
            'Play live games',
            '5 game types',
            'View reports'];
    }

    public static premiumTeacherFeatures(): any[] {
        return [
            'Everything is free, plus',
            'Create teams',
            'Schedules games',
            'Self paced games',
            'All game types',
            'Detailed analytics'
        ];
    }

    public static freeParentFeatures(): any[] {
        return [
            'Add up to 4 children',
            'Play scheduled games',
            '5 game types',
            'View children reports'
        ];
    }

    public static premiumParentFeatures(): any[] {
        return [
            'Everything is free, plus',
            'Create teams',
            'Live games',
            'Self paced games',
            'All game types',
            'Detailed analytics'
        ];
    }

}
