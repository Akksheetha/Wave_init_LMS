import { Locator, Page, expect } from '@playwright/test';
import { basePage } from './basePage';

export class courseDetailsPage extends basePage {

    readonly courseTitle: Locator;
    readonly courseDescription: Locator;
    readonly courseContent: Locator;
    readonly startCourseButton: Locator;

    constructor(page: Page) {
        super(page);

        this.courseTitle = page.getByRole('heading', {
            level: 1
        });

        this.courseDescription = page.locator(
            'p.wl-detail-hero-desc'
        );

        this.courseContent = page.getByText(
            'Course Curriculum & Materials',
            {
                exact: true
            }
        );

        this.startCourseButton = page.getByRole('button', {
            name: /Start Learning/i
        });
    }

    async verifyCourseDetailsPage() {
        await expect(this.courseTitle).toBeVisible();
    }

    async verifyCourseTitle(expectedTitle: string) {
        const title = this.page.getByRole('heading', {
            name: expectedTitle,
            exact: true
        });

        await expect(title).toBeVisible();
    }

    async verifyCourseDescription() {
        await expect(this.courseDescription).toBeVisible();
    }

    async verifyCourseContent() {
        await expect(this.courseContent).toBeVisible();
    }

    async clickStartCourse() {
        await this.click(this.startCourseButton);
    }

    async verifyCourseStarted() {
        await expect(
            this.page.getByText(
                /continue|in progress|started/i
            ).first()
        ).toBeVisible();
    }
}