import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { customworld } from "../world/customWorld";
import discussionData from "../testData/discussiondata.json";
import { DiscussionPage } from "../pages/discussionpage";

const STEP_TIMEOUT = { timeout: 60 * 1000 };


// Open My Courses
Given(
    "the learner opens {string}",
    STEP_TIMEOUT,
    async function (this: customworld, linkName: string) {

        if (linkName === "My Courses") {

            const discussionPage = new DiscussionPage(this.page);

            await discussionPage.openMyCourses();
        }
    }
);


// Open course from test data
Given(
    "the learner opens the course from test data",
    STEP_TIMEOUT,
    async function (this: customworld) {

        const discussionPage = new DiscussionPage(this.page);

        await discussionPage.openCourseByName(
            discussionData.course.name
        );
    }
);


// Open Discussions tab
Given(
    "the learner clicks on the {string} tab",
    STEP_TIMEOUT,
    async function (this: customworld, tabName: string) {

        const discussionPage = new DiscussionPage(this.page);

        if (tabName === "Discussions") {
            await discussionPage.openDiscussionsTab();
        }
    }
);


// Select post type
When(
    "the learner selects {string} from the post type dropdown",
    STEP_TIMEOUT,
    async function (this: customworld, postType: string) {

        const discussionPage = new DiscussionPage(this.page);

        await discussionPage.selectPostType(postType);
    }
);


// Enter post message
When(
    "the learner enters the message for {string} from test data",
    STEP_TIMEOUT,
    async function (this: customworld, postType: string) {

        const discussionPage = new DiscussionPage(this.page);

        const posts = discussionData.posts as Record<string, string>;

        const baseMessage = posts[postType];

        if (!baseMessage) {
            throw new Error(
                `No message found in discussionData.json for post type: ${postType}`
            );
        }

        const uniqueMessage = `${baseMessage} - ${Date.now()}`;

        (
            this as customworld & {
                lastPostedMessage: string;
            }
        ).lastPostedMessage = uniqueMessage;

        await discussionPage.enterPostMessage(uniqueMessage);
    }
);


// Click Post button
When(
    "the learner clicks the {string} button",
    STEP_TIMEOUT,
    async function (this: customworld, buttonName: string) {

        const discussionPage = new DiscussionPage(this.page);

        if (buttonName === "Post") {
            await discussionPage.submitPost();
        }
    }
);


// Verify posted message
Then(
    "the posted message should be visible under the {string} tab",
    STEP_TIMEOUT,
    async function (this: customworld, tabName: string) {

        const discussionPage = new DiscussionPage(this.page);

        if (tabName === "All Posts") {

            await discussionPage.openAllPostsTab();

        } else if (tabName === "Q&A") {

            await discussionPage.openQnaTab();

        } else if (tabName === "Discussions") {

            await discussionPage.openDiscussionsTab();
        }

        const lastPostedMessage = (
            this as customworld & {
                lastPostedMessage: string;
            }
        ).lastPostedMessage;

        const isVisible =
            await discussionPage.isPostVisible(lastPostedMessage);

        expect(isVisible).toBe(true);
    }
);