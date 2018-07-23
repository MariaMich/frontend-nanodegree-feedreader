/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('a defined URL exists', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});
		/* A test that loops through each feed in the allFeeds object
		 * and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('a defined name exists', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});
	});
	/*  A new test suite called "The menu" */
	describe('The menu', function() {
		var body = $('body');
		/* A test that ensures the menu element is
		 * hidden by default and uses the .hasClass() method from jQuery
		 */
		it('menu element hidden by default', function() {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
		/* A test that ensures the menu changes
		 * visibility when the menu icon is clicked. The menu displays when
		 * clicked and it hides when clicked again.
		 */
		it('menu icon changes visibility when clicked', function() {
			var menuIcon = $('.menu-icon-link');
			//click icon menu should be visible
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(false);
			// Click icon menu shouldn't be visible
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});
	/* Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		// Completing the loadFeed() function first
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		// Executing asynchronously
		it('at least 1 .entry element exists within .feed container', function(done) {
			expect($('.feed .entry').length).toBeGreaterThan(0);
		});
	});
	/* A new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		// Checking the length before loadFeed has run
		var before, after;
		/* A test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		// Executing loadFeed()
		beforeEach(function(done) {
			loadFeed(0, function() {
				before = $('.feed').html();
				loadFeed(1, function() {
					done();
				});
			});
		});
		// Seeing if the content has changed
		// Comparing the starting length before executing loadFeed
		// to the final length after loadFeed has been executed
		it('content is changed at every new feed loaded', function(done) {
			after = $('.feed').html();
			expect(before).not.toBe(after);
			done();
		});
	});
}());
